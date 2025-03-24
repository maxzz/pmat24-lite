import { proxySet } from "valtio/utils";
import { uuid } from "@/store/manifest";
import { isAllowedExt, pathWithoutFilename } from "@/utils";
import { findShortestPathInFnames, isFileWithDirectoryAndFileHandle, isFileWithFileHandle, textFileReaderPromisify } from "@/store/store-utils";
import { electronGetPaths, invokeLoadFiles, setRootFromMainFileContents } from "@/xternal-to-main";
import { type FileContent, WebFsItem, pmAllowedToOpenExt } from "@shared/ipc-types";
import { collectWebDndItems } from "./2-collect-web-dnd-items";
import { setRootDir } from "../../0-files-atom";

type DropItem = {
    fname: string;                          // basename as filename w/ extension but wo/ path
    fpath: string;                          // file path without filename
    fileWeb: File;                          // web: File object from async entry.file() call
    webFsItem: WebFsItem | null;            // web: for files loaded without electron
    notOur: boolean;                        // load of file content was blocked by allowedExt list.
};

async function loadFilesAndCreateFileContents(dropItems: DropItem[]): Promise<FileContent[]> {
    const rv: FileContent[] = [];

    dropItems.forEach((dropItem) => dropItem.notOur = !isAllowedExt(dropItem.fname, pmAllowedToOpenExt));

    for (const [idx, dropItem] of dropItems.entries()) {
        if (!dropItem.fileWeb) {
            console.error('Empty entry or file', dropItem);
            continue;
        }

        try {
            const newItem: FileContent = {
                unid: uuid.asRelativeNumber(),
                idx,
                fname: dropItem.fname,
                fpath: dropItem.fpath,
                fmodi: dropItem.fileWeb.lastModified,
                size: dropItem.fileWeb.size,
                raw: '',

                newFile: false,
                newAsManual: false,
                fromMain: false,

                webFsItem: dropItem.webFsItem,
                webFile: dropItem.fileWeb,

                notOur: dropItem.notOur,
                failed: false,

                changesSet: proxySet<string>(),
            };

            try {
                newItem.raw = dropItem.notOur ? '' : await textFileReaderPromisify(dropItem.fileWeb);
            } catch (error) {
                newItem.raw = error instanceof Error ? error.message : JSON.stringify(error);
                newItem.failed = true;
            }

            rv.push(newItem);
        } catch (error) {
            console.error('Error processing drop item:', error, dropItem);
        }
    }//for

    return rv;
}

/**
 * Create FileContent items from web drag and drop operation
 */
export async function createFileContents_WebAfterDnd(fileDataTransferItems: DataTransferItem[]): Promise<FileContent[]> {

    let items: DropItem[] = await mapToDropItems(fileDataTransferItems);
    const rv = await loadFilesAndCreateFileContents(items);

    const singleFolder = getSingleFolderHandle(items);

    setRootDir({ rpath: findShortestPathInFnames(rv.map((item) => item.fpath)), handle: singleFolder, fromMain: false });
    return singleFolder ? rv : [];

    async function mapToDropItems(fileDataTransferItems: DataTransferItem[]): Promise<DropItem[]> {
        const dndItems = (await collectWebDndItems(fileDataTransferItems)).filter((item) => item.file);

        let rv: DropItem[] = [];
        try {
            rv = dndItems.map(
                (dndItem) => {
                    const rv: DropItem = {
                        fname: dndItem.file!.name,
                        fpath: dndItem.path,
                        fileWeb: dndItem.file!,
                        webFsItem: dndItem,
                        notOur: false,
                    };
                    return rv;
                }
            ).filter((dropItem) => !!dropItem);
        } catch (error) {
            console.error('cannot read from DataTransferItemList', fileDataTransferItems);
        }
        return rv;
    }
}

/**
 * Check if we drop a single folder and can get its handle.
 * fpath with slash is a subfolder item, so we skip any subfolder items to find the root folder.
 */
function getSingleFolderHandle(items: DropItem[]) {
    const parents = new Set(items.map((item) => item.fpath?.indexOf('/') === -1 ? item.webFsItem?.parent : undefined).filter(Boolean));
    const parentHandle = parents.size === 1 ? parents.values().next().value || undefined : undefined;
    return parentHandle;
}

/**
 * Create FileContent items from open file/directory web dialog
 */
export async function createFileContents_WebAfterDlgOpen(files: File[]): Promise<FileContent[]> {

    let items: DropItem[] = await mapToDropItems(files);
    const rv = loadFilesAndCreateFileContents(items);
    return rv;

    async function mapToDropItems(files: File[]): Promise<DropItem[]> {
        let rv: DropItem[] = [];
        try {
            rv = await Promise.all(files.map(
                async (file) => {
                    const webFsItem = new WebFsItem({
                        file,
                        handle: isFileWithFileHandle(file) ? file.handle : null,
                        parent: isFileWithDirectoryAndFileHandle(file) ? file.directoryHandle : null,
                        path: pathWithoutFilename(file.webkitRelativePath), // webkitRelativePath is "C/D/E/{10250eb8-d616-4370-b3ab-39aedb8c6950}.dpm"
                    });

                    const rv: DropItem = {
                        fname: file.name,
                        fpath: webFsItem.path,
                        fileWeb: file,
                        webFsItem: webFsItem,
                        notOur: false,
                    };
                    return rv;
                }
            ));
        } catch (error) {
            console.error('cannot read from File[]', files);
        }
        return rv;
    }
}

/**
 * Create FileContent items from open file/directory legacy web dialog or legacy drag and drop operation
 * Modern drag and drop and dialog operations are not supported due to electronGetPaths() limitations.
 * It should be File object not modified by JS.
 */
export async function createFileContents_From_Main(files: File[]): Promise<FileContent[] | undefined> {
    const fileAndNames = electronGetPaths(files);
    const fnames = fileAndNames.map((item) => item[1]);
    //printFnameFiles(fnames, files);

    if (fileAndNames.length) {
        const rv: FileContent[] = await invokeLoadFiles(fnames, pmAllowedToOpenExt);
        setRootFromMainFileContents(rv);
        return rv;
    }
}

//

function printFnameFiles(filenames: string[], files: File[]) {
    console.log('%cdoSetFilesFromLegacyDialogAtom electron', 'color: magenta');
    
    files.forEach((f, idx) => {
        console.log(' ', { f }, `"${filenames[idx]}"`);
    });
}
