import { proxySet } from "valtio/utils";
import { type WebFsItem, type FileContent, pmAllowedToOpenExt } from "@shared/ipc-types";
import { textFileReaderPromisify } from "./8-text-file-reader";
import { isAllowedExt, pathWithoutFilename, uuid } from "@/utils";
import { collectWebDndItems } from "./2-collect-web-dnd-items";
import { electronGetPaths } from "./8-electron-get-paths";
import { invokeLoadFiles } from "@/xternal-to-main";

type DropItem = {
    fname: string;                          // basename as filename w/ extension but wo/ path
    fpath: string;                          // file path without filename
    fileWeb: File;                          // web: File object from async entry.file() call
    webFsItem: WebFsItem | null;            // web: for files loaded without electron
    notOur: boolean;                        // load of file content was blocked by allowedExt list.
};

async function loadFilesAndCreateFileContents(dropItems: DropItem[]): Promise<FileContent[]> {
    const res: FileContent[] = [];

    dropItems.forEach((item) => item.notOur = !isAllowedExt(item.fname, pmAllowedToOpenExt));

    for (const [idx, item] of dropItems.entries()) {
        if (!item.fileWeb) {
            console.log('Empty entry or file', item);
            continue;
        }

        try {
            const newItem: FileContent = {
                unid: uuid.asRelativeNumber(),
                idx,
                fname: item.fname,
                fpath: item.fpath,
                fmodi: item.fileWeb.lastModified,
                size: item.fileWeb.size,
                raw: '',

                webFsItem: item.webFsItem,

                webFile: item.fileWeb,

                notOur: item.notOur,
                failed: false,

                changesSet: proxySet<string>(),
            };

            try {
                newItem.raw = item.notOur ? '' : await textFileReaderPromisify(item.fileWeb);
            } catch (error) {
                newItem.raw = error instanceof Error ? error.message : JSON.stringify(error);
                newItem.failed = true;
            }

            res.push(newItem);
        } catch (error) {
            console.error('Error processing drop item:', error, item);
        }
    }

    //TODO: setRootDir({ rpath: '', handle: undefined });
    return res;
}

/**
 * Create FileContent items from web drag and drop operation
 */
export async function createFileContents_WebAfterDnd(fileDataTransferItems: DataTransferItem[]): Promise<FileContent[]> {

    let items: DropItem[] = await mapToDropItems(fileDataTransferItems);
    const rv = loadFilesAndCreateFileContents(items);
    return rv;

    async function mapToDropItems(fileDataTransferItems: DataTransferItem[]): Promise<DropItem[]> {
        const dndItems = (await collectWebDndItems(fileDataTransferItems)).filter((item) => item.file);

        let rv: DropItem[] = [];
        try {
            rv = dndItems.map(
                (item) => {
                    const rv: DropItem = {
                        fname: item.file!.name,
                        fpath: item.path,
                        fileWeb: item.file!,
                        webFsItem: item,
                        notOur: false,
                    };
                    return rv;
                }
            ).filter((item) => !!item);
        } catch (error) {
            console.error('cannot read from DataTransferItemList', fileDataTransferItems);
        }
        return rv;
    }
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
                    const rv: DropItem = {
                        fname: file.name,
                        fpath: pathWithoutFilename(file.webkitRelativePath), // webkitRelativePath is "C/D/E/{10250eb8-d616-4370-b3ab-39aedb8c6950}.dpm"
                        fileWeb: file,
                        webFsItem: null,
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
    const filenames = electronGetPaths(files);
    printFnameFiles(filenames, files);

    //TODO: setRootDir({ rpath: '', handle: undefined });

    if (filenames.length) {
        const rv: FileContent[] = await invokeLoadFiles(filenames, pmAllowedToOpenExt);
        return rv;
    }
}

function printFnameFiles(filenames: string[], files: File[]) {
    console.log('%cdoSetFilesFromLegacyDialogAtom electron', 'color: magenta');
    files.forEach((f, idx) => {
        console.log(' ', { f }, `"${filenames[idx]}"`);
    });
}
