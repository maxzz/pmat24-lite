import { FileContent } from "@shared/ipc-types";
import { extensionWoDot } from "../../../../utils/os-utils";
import { fileEntryToFile, getAllFileEntries } from "./1-web-file-entries";
import { uuid } from "../../../../utils/uuid";

type DropItem = {
    fname: string;                          // basename as filename w/ extension but wo/ path
    fpath: string;                          // file full (in this case relative the root of drop) path and filename
    fileWeb: File;                          // web: File object from async entry.file() call
    legacyEntry?: FileSystemFileEntry;      // web: FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    handle: FileSystemFileHandle | null;    // FileSystemFileHandle from drag and drop transfer items
    notOur?: boolean;                       // load of file content was blocked by allowedExt list.
};

function textFileReader(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const aborted = () => reject(`File (${file.name}) reading was aborted`);
        reader.onabort = aborted;
        reader.onerror = aborted;
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.readAsText(file);
    });
}

async function createFileContents(dropItems: DropItem[]): Promise<FileContent[]> {
    const res: FileContent[] = [];

    for (const [idx, item] of dropItems.entries()) {
        if (!item.fileWeb) {
            console.error('Empty entry or file', item);
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

                legacyEntry: item.legacyEntry,
                webFile: item.fileWeb,

                notOur: item.notOur,
                failed: false,
            };

            try {
                newItem.raw = item.notOur ? '' : await textFileReader(item.fileWeb);
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

function isOurExt(filename: string | undefined, allowedExt: string[]): boolean | undefined {
    const ext = extensionWoDot(filename || '').replace('.', '').toLowerCase();
    return allowedExt.includes(ext);
}

/**
 * Create FileContent items from web drag and drop operation
 */
export async function webAfterDndCreateFileContents(fileDataTransferItems: DataTransferItem[], allowedExt?: string[]): Promise<FileContent[]> {
    let items: DropItem[] = await webGetFilesTransferItems(fileDataTransferItems);

    allowedExt && items.forEach((item) => item.notOur = !isOurExt(item.fname, allowedExt));

    return createFileContents(items);

    async function webGetFilesTransferItems(fileDataTransferItems: DataTransferItem[]): Promise<DropItem[]> {
        const entries = await getAllFileEntries(fileDataTransferItems);
        let rv: DropItem[] = [];
        try {
            rv = await Promise.all(entries.map(
                async (item) => {
                    return {
                        fname: item.legacyEntry.name,
                        fpath: item.legacyEntry.fullPath,
                        fileWeb: await fileEntryToFile(item.legacyEntry),
                        entry: item.legacyEntry,
                        handle: item.modernHandle,
                        notOur: false,
                    };
                })
            );
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

    allowedExt && items.forEach((item) => item.notOur = !isOurExt(item.fname, allowedExt));

    return createFileContents(items);

    async function mapToDropItems(files: File[]): Promise<DropItem[]> {
        let rv: DropItem[] = [];
        try {
            rv = await Promise.all(files.map(
                async (file) => {
                    return {
                        fname: file.name,
                        fpath: file.webkitRelativePath,
                        fileWeb: file,
                        entry: undefined,
                        handle: null,
                        notOur: false,
                    };
                }
            ));
        } catch (error) {
            console.error('cannot read from File[]', files);
        }
        return rv;
    }
}

/**
 * electron filenames
 */
export function electronGetPaths(files: File[]): string[] {
    const filenames = [...files]
        .map(
            (file) => {
                return tmApi.getPathForFile(file);
            }
        )
        .filter(Boolean);
    return filenames;
}
