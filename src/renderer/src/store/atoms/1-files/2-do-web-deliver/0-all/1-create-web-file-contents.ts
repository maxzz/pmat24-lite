import { type WebFsItem, type FileContent } from "@shared/ipc-types";
import { textFileReaderPromisify } from "./8-text-file-reader";
import { isAllowedExt, pathWithoutFilename, uuid } from "@/utils";
import { collectDndItems } from "./2-collect-dnd-items";

type DropItem = {
    fname: string;                          // basename as filename w/ extension but wo/ path
    fpath: string;                          // file path without filename
    fileWeb: File;                          // web: File object from async entry.file() call

    legacyEntry?: FileSystemFileEntry;      // web: FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    handle: FileSystemFileHandle | null;    // FileSystemFileHandle from drag and drop transfer items

    notOur?: boolean;                       // load of file content was blocked by allowedExt list.

    webFsItem: WebFsItem | null;            // web: for files loaded without electron
};

async function loadFilesAndCreateFileContents(dropItems: DropItem[]): Promise<FileContent[]> {
    const res: FileContent[] = [];

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

                webFsItem: null,

                webFile: item.fileWeb,

                notOur: item.notOur,
                failed: false,
            };

            try {
                newItem.raw = item.notOur ? '' : await textFileReaderPromisify(item.fileWeb);
                item.notOur && (newItem.failed = true);
            } catch (error) {
                newItem.raw = error instanceof Error ? error.message : JSON.stringify(error);
                newItem.failed = true;
            }

            res.push(newItem);
        } catch (error) {
            console.error('Error processing drop item:', error, item);
        }
    }

    return res;
}

/**
 * Create FileContent items from web drag and drop operation
 */
export async function webAfterDndCreateFileContents(fileDataTransferItems: DataTransferItem[], allowedExt?: string[]): Promise<FileContent[]> {

    let items: DropItem[] = await webGetFilesTransferItems(fileDataTransferItems);

    allowedExt && items.forEach((item) => item.notOur = !isAllowedExt(item.fname, allowedExt));

    const rv = loadFilesAndCreateFileContents(items);
    return rv;

    async function webGetFilesTransferItems(fileDataTransferItems: DataTransferItem[]): Promise<DropItem[]> {

        const dndItems = (await collectDndItems(fileDataTransferItems)).filter((item) => item.file);

        let rv: DropItem[] = [];
        try {
            rv = dndItems.map(
                (item) => {
                    const rv: DropItem = {
                        fname: item.file!.name,
                        fpath: pathWithoutFilename(item.path),
                        fileWeb: item.file!,
                        handle: item.handle as FileSystemFileHandle,
                        notOur: false,

                        webFsItem: item,
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
export async function webAfterDlgOpenCreateFileContents(files: File[], allowedExt?: string[]): Promise<FileContent[]> {

    let items: DropItem[] = await mapToDropItems(files);

    allowedExt && items.forEach((item) => item.notOur = !isAllowedExt(item.fname, allowedExt));

    const rv = loadFilesAndCreateFileContents(items);
    return rv;

    async function mapToDropItems(files: File[]): Promise<DropItem[]> {
        let rv: DropItem[] = [];
        try {
            rv = await Promise.all(files.map(
                async (file) => {
                    console.log('file.webkitRelativePath', file.webkitRelativePath);
                    const rv: DropItem = {
                        fname: file.name,
                        fpath: pathWithoutFilename(file.webkitRelativePath),
                        fileWeb: file,
                        legacyEntry: undefined,
                        handle: null,
                        notOur: false,

                        webFsItem: null,
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
