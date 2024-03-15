import { FileContent } from "@shared/ipc-types";
import { ext } from "../../../utils/os-utils";
import { fileEntryToFile, getAllFileEntries } from "./web-file-entries";
import { uuid } from "../../../utils/uuid";

type DropItem = {
    name: string;                   // basename as filename w/ extension but wo/ path
    fullPath: string;               // file full (in this case relative the root of drop) path and filename

    notOur?: boolean;               // load of file content was blocked by allowedExt list.

    entry?: FileSystemFileEntry;    // web: FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    file: File;                     // web: File object from async entry.file() call
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

async function mapToFileContentItems(dropItems: DropItem[]): Promise<FileContent[]> {
    const res: FileContent[] = [];

    for (const [idx, item] of dropItems.entries()) {
        if (!item.file) {
            console.error('Empty entry or file', item);
            continue;
        }

        try {
            const newItem: FileContent = {
                id: uuid.asRelativeNumber(),
                idx,
                fname: item.name,
                fpath: item.fullPath,
                fmodi: item.file.lastModified,
                size: item.file.size,
                raw: '',

                entry: item.entry,
                file: item.file,

                notOur: item.notOur,
                failed: false,
            };

            try {
                newItem.raw = item.notOur ? '' : await textFileReader(item.file);
                item.notOur && (newItem.failed = true);
            } catch (error) {
                newItem.raw = error instanceof Error ? error.message : JSON.stringify(error);
                newItem.failed = true;
            }

            res.push(newItem);
        } catch (error) {
            console.error('Error processing drop item:', error);
        }
    }

    return res;
}

// Web drag and drop

export async function webLoadAfterDataTransferContent(dataTransferItemList: DataTransferItemList, allowedExt?: string[]): Promise<FileContent[]> {
    let items: DropItem[] = await webGetFilesTransferItems(dataTransferItemList);

    if (allowedExt) {
        items = items.map(
            (item) => (
                isOurExt(item.name, allowedExt)
                    ? item
                    : { ...item, notOur: true }
            )
        );
    }

    return mapToFileContentItems(items);

    function isOurExt(filename: string | undefined, allowedExt: string[]): boolean | undefined {
        const ex = ext(filename || '').replace('.', '').toLowerCase();
        return allowedExt.includes(ex);
    }

    async function webGetFilesTransferItems(dataTransferItemList: DataTransferItemList): Promise<DropItem[]> {
        const entries = await getAllFileEntries(dataTransferItemList);
        let rv: DropItem[] = [];
        try {
            rv = await Promise.all(entries.map(
                async (entry) => ({
                    name: entry.name,
                    fullPath: entry.fullPath,
                    entry,
                    file: await fileEntryToFile(entry),
                }))
            );
        } catch (error) {
            console.error('cannot read from DataTransferItemList', dataTransferItemList);
        }
        return rv;
    }
}

// Web dialog open file/directory

export async function webLoadAfterDialogOpen(files: File[], allowedExt?: string[]): Promise<FileContent[]> {
    let items: DropItem[] = await mapToDropItems(files);

    items = allowedExt
        ? items.map((item) => allowedExt.includes(ext(item.name).toLowerCase())
            ? item
            : { ...item, notOur: true, failed: true })
        : items;

    return mapToFileContentItems(items);

    async function mapToDropItems(files: File[]): Promise<DropItem[]> {
        let rv: DropItem[] = [];
        try {
            rv = await Promise.all(files.map(
                async (file) => ({
                    name: file.name,
                    fullPath: file.webkitRelativePath,
                    entry: undefined,
                    file: file,
                })
            ));
        } catch (error) {
            console.error('cannot read from File[]', files);
        }
        return rv;
    }
}

// electron filenames

export function electronGetPathes(files: File[]): string[] {
    const filenames = [...files].map((file) => (file as File & { path: string; }).path).filter(Boolean);
    return filenames;
}
