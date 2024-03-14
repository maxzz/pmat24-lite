import { FileContent } from "@shared/ipc-types";
import { ext } from "../../../utils/os-utils";
import { fileEntryToFile, getAllFileEntries } from "./web-file-entries";
import { uuid } from "../../../utils/uuid";

type DropItem = {
    name: string;                   //
    fullPath: string;
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

async function mapDropItemsToFileContents(dropItems: DropItem[]): Promise<FileContent[]> {
    const res: FileContent[] = [];
    for (const item of dropItems) {
        try {
            if (!item.file) {
                throw new Error('Empty entry or file');
            }

            if (item.notOur) {
                res.push({
                    id: uuid.asRelativeNumber(),
                    entry: item.entry,
                    file: item.file,
                    basename: item.name,
                    fullname: item.fullPath,
                    raw: '',
                    failed: true,
                    notOur: true,
                });
                continue;
            }

            const cnt = await textFileReader(item.file);
            res.push({
                id: uuid.asRelativeNumber(),
                entry: item.entry,
                file: item.file,
                basename: item.name,
                fullname: item.fullPath,
                raw: cnt,
            });

        } catch (error) {
            res.push({
                id: uuid.asRelativeNumber(),
                entry: item.entry,
                file: item.file,
                basename: item.name,
                fullname: item.fullPath,
                raw: error instanceof Error ? error.message : JSON.stringify(error),
                failed: true,
            });
        }
    }
    return res;
}

// Web drag and drop

export async function webLoadAfterDataTransferContent(dataTransferItemList: DataTransferItemList, allowedExt?: string[]): Promise<FileContent[]> {
    let items: DropItem[] = await webGetFilesTransferItems(dataTransferItemList);

    items = allowedExt
        ? items.map((item) => allowedExt.includes(ext(item.name).toLowerCase())
            ? item
            : { ...item, notOur: true, failed: true })
        : items;

    return mapDropItemsToFileContents(items);

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

    return mapDropItemsToFileContents(items);

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
