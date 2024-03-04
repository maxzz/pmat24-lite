import { FileContent } from "@shared/ipc-types";
import { ext } from "./os-utils";
import { fileEntryToFile, getAllFileEntries } from "./web-data-transfer-item-list";

type DropItem = {
    name: string;
    fullPath: string;
    notOur?: boolean;            // load of file content was blocked by allowedExt list.
    entry?: FileSystemFileEntry; // FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    file: File;                  // File object from async entry.file() call
};

// Web drag and drop

async function webGetFilesTransferItems(dataTransferItemList: DataTransferItemList): Promise<DropItem[]> {
    const entries = await getAllFileEntries(dataTransferItemList);
    let rv: DropItem[] = [];
    try {
        rv = await Promise.all(entries.map(async (entry) => ({
            name: entry.name,
            fullPath: entry.fullPath,
            entry,
            file: await fileEntryToFile(entry),
        })));
    } catch (error) {
        console.error('cannot read from DataTransferItemList', dataTransferItemList);
    }
    return rv;
}

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

async function webLoadFilesContent(dropItems: DropItem[]): Promise<FileContent[]> {
    const res: FileContent[] = [];
    for (const item of dropItems) {
        try {
            if (!item.file) {
                throw new Error('Empty entry or file');
            }
            if (item.notOur) {
                res.push({
                    entry: item.entry,
                    file: item.file,
                    name: item.name,
                    fullPath: item.fullPath,
                    cnt: '',
                    failed: true,
                    notOur: true,
                });
                continue;
            }
            const cnt = await textFileReader(item.file);
            res.push({
                entry: item.entry,
                file: item.file,
                name: item.name,
                fullPath: item.fullPath,
                cnt,
            });
        } catch (error) {
            res.push({
                entry: item.entry,
                file: item.file,
                name: item.name,
                fullPath: item.fullPath,
                cnt: error instanceof Error ? error.message : JSON.stringify(error),
                failed: true,
            });
        }
    }
    return res;
}

export async function webLoadDataTransferContent(dataTransferItemList: DataTransferItemList, allowedExt?: string[]): Promise<FileContent[]> {
    let items: DropItem[] = await webGetFilesTransferItems(dataTransferItemList);
    items = allowedExt
        ? items.map((item) => allowedExt.includes(ext(item.name).toLowerCase())
            ? item
            : { ...item, notOur: true, failed: true })
        : items;
    return webLoadFilesContent(items);
}

// Web dialog open file/directory

async function webGetFilesFromDialog(files: File[]): Promise<DropItem[]> {
    let rv: DropItem[] = [];
    try {
        rv = await Promise.all(files.map(async (file) => ({
            name: file.name,
            fullPath: file.webkitRelativePath,
            entry: undefined,
            file: file,
        })));
    } catch (error) {
        console.error('cannot read from File[]', files);
    }
    return rv;
}

export async function webLoadDialogOpen(files: File[], allowedExt?: string[]): Promise<FileContent[]> {
    let items: DropItem[] = await webGetFilesFromDialog(files);
    items = allowedExt
        ? items.map((item) => allowedExt.includes(ext(item.name).toLowerCase())
            ? item
            : { ...item, notOur: true, failed: true })
        : items;
    return webLoadFilesContent(items);
}

// electron filenames

export function electronGetPathes(files: File[]): string[] {
    const filenames = [...files].map((file) => (file as File & { path: string; }).path).filter(Boolean);
    return filenames;
}
