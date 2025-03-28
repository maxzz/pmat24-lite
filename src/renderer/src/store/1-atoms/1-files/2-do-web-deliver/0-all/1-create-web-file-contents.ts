import { proxySet } from "valtio/utils";
import { uuid } from "@/store/manifest";
import { isAllowedExt, pathWithoutFilename } from "@/utils";
import { findShortestPathInFnames, isFileWithDirectoryAndFileHandle, isFileWithFileHandle, textFileReaderPromisify } from "@/store/store-utils";
import { electronGetPaths, getRootFromFpath, invokeLoadFiles } from "@/xternal-to-main";
import { type FileContent, WebFsItem, pmAllowedToOpenExt } from "@shared/ipc-types";
import { type PmatFolder } from "../../0-files-atom";
import { type SetDeliveredFiles } from "../../1-do-set-files";
import { collectWebDndItems } from "./8-collect-web-dnd-items";

type DropItem = {
    fname: string;                          // basename as filename w/ extension but wo/ path
    fpath: string;                          // file path without filename
    fileWeb: File;                          // web: File object from async entry.file() call
    webFsItem: WebFsItem | null;            // web: for files loaded without electron
    notOur: boolean;                        // load of file content was blocked by allowedExt list.
};

/**
 * Create FileContent items from open file/directory legacy web dialog or legacy drag and drop operation
 * Modern drag and drop and dialog operations are not supported due to electronGetPaths() limitations.
 * It should be File object not modified by JS.
 */
export async function createFileContents_From_Main(files: File[]): Promise<SetDeliveredFiles | undefined> {
    const fileAndNames = electronGetPaths(files);
    const fnames = fileAndNames.map((item) => item[1]);
    //printElectronFnameFiles(fnames, files);

    if (fileAndNames.length) {
        const deliveredFileContents: FileContent[] = await invokeLoadFiles(fnames, pmAllowedToOpenExt);
        return {
            deliveredFileContents,
            root: getRootFromFpath({ files: deliveredFileContents, fromMain: true }),
        };
    }
}

export async function createFileContents_FromMru_Main(folder: PmatFolder): Promise<SetDeliveredFiles | undefined> {
    if (folder.fpath) {
        const deliveredFileContents: FileContent[] = await invokeLoadFiles([folder.fpath], pmAllowedToOpenExt);
        return {
            deliveredFileContents,
            root: folder,
        };
    }
}

/**
 * Create FileContent items from open file/directory web dialog
 */
export async function createFileContents_WebAfterDlgOpen(files: File[]): Promise<FileContent[]> {

    let dropItems: DropItem[] = await mapToDropItems(files);
    const rv = loadFilesAndCreateFileContents(dropItems);
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
 * Create FileContent items from web drag and drop operation
 */
export async function createFileContents_WebAfterDnd(fileDataTransferItems: DataTransferItem[]): Promise<SetDeliveredFiles> {

    const dndItems = (await collectWebDndItems(fileDataTransferItems)).filter((item) => item.file);
    const dropItems: DropItem[] = await mapToDropItems(dndItems);

    const deliveredFileContents = await loadFilesAndCreateFileContents(dropItems);
    return {
        deliveredFileContents,
        root: {
            fpath: findShortestPathInFnames(deliveredFileContents.map((item) => item.fpath)),
            handle: getSingleFolderHandle(dropItems),
            fromMain: false,
        }
    };

    async function mapToDropItems(dndItems: WebFsItem[]): Promise<DropItem[]> {
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
 * Check if we drop a single folder and can get its handle.
 * fpath with slash is a subfolder item, so we skip any subfolder items to find the root folder.
 */
function getSingleFolderHandle(items: DropItem[]) {
    const parentsSet = new Set(
        items.map(
            (item) => item.fpath?.indexOf('/') === -1 ? item.webFsItem?.parent : undefined
        ).filter(Boolean)
    );
    const parentHandle = parentsSet.size === 1 ? parentsSet.values().next().value || undefined : undefined;
    return parentHandle;
}

//

function printElectronFnameFiles(filenames: string[], files: File[]) {
    console.log('%ccreateFileContents_From_Main', 'color: magenta');

    files.forEach((f, idx) => {
        console.log(' ', { f }, `"${filenames[idx]}"`);
    });
}
