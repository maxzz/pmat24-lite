import { FileContent } from "@shared/ipc-types";
import { extensionWoDot } from "../../../../utils/os-utils";
import { fileEntryToFile, getAllFileEntries } from "./web-file-entries";
import { uuid } from "../../../../utils/uuid";

type DropItem = {
    fname: string;                  // basename as filename w/ extension but wo/ path
    fpath: string;                  // file full (in this case relative the root of drop) path and filename
    fileHandle: File;               // web: File object from async entry.file() call
    entry?: FileSystemFileEntry;    // web: FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    notOur?: boolean;               // load of file content was blocked by allowedExt list.
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
        if (!item.fileHandle) {
            console.error('Empty entry or file', item);
            continue;
        }

        try {
            const newItem: FileContent = {
                id: uuid.asRelativeNumber(),
                idx,
                fname: item.fname,
                fpath: item.fpath,
                fmodi: item.fileHandle.lastModified,
                size: item.fileHandle.size,
                raw: '',

                entry: item.entry,
                file: item.fileHandle,

                notOur: item.notOur,
                failed: false,
            };

            try {
                newItem.raw = item.notOur ? '' : await textFileReader(item.fileHandle);
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
export async function webLoadAfterDataTransferContent(dataTransferItemList: DataTransferItemList, allowedExt?: string[]): Promise<FileContent[]> {
    let items: DropItem[] = await webGetFilesTransferItems(dataTransferItemList);

    allowedExt && items.forEach((item) => item.notOur = !isOurExt(item.fname, allowedExt));

    return mapToFileContentItems(items);

    async function webGetFilesTransferItems(dataTransferItemList: DataTransferItemList): Promise<DropItem[]> {
        const entries = await getAllFileEntries(dataTransferItemList);
        let rv: DropItem[] = [];
        try {
            rv = await Promise.all(entries.map(
                async (entry) => {
                    return {
                        fname: entry.name,
                        fpath: entry.fullPath,
                        fileHandle: await fileEntryToFile(entry),
                        entry,
                        notOur: false,
                    };
                })
            );
        } catch (error) {
            console.error('cannot read from DataTransferItemList', dataTransferItemList);
        }
        return rv;
    }
}

/**
 * Create FileContent items from open file/directory web dialog
 */
export async function webLoadAfterDialogOpen(files: File[], allowedExt?: string[]): Promise<FileContent[]> {
    let items: DropItem[] = await mapToDropItems(files);

    allowedExt && items.forEach((item) => item.notOur = !isOurExt(item.fname, allowedExt));

    return mapToFileContentItems(items);

    async function mapToDropItems(files: File[]): Promise<DropItem[]> {
        let rv: DropItem[] = [];
        try {
            rv = await Promise.all(files.map(
                async (file) => {
                    return {
                        fname: file.name,
                        fpath: file.webkitRelativePath,
                        fileHandle: file,
                        entry: undefined,
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

// electron filenames

export function electronGetPathes(files: File[]): string[] {
    const filenames = [...files].map((file) => (file as File & { path: string; }).path).filter(Boolean);
    return filenames;
}

//TODO: 09.04.24. 
//      Inside electronGetPathes() files son't have 'path' and 'webkitRelativePath; properties anymore.
//      Drop files and folder does not work for native version.

	//G: 'electron drag and drop file path'
		//https://www.electronjs.org/docs/latest/tutorial/native-file-drag-drop
		//https://stackoverflow.com/questions/68104292/how-to-drop-a-file-from-explorer-and-get-its-full-path-to-electronjs-app ! 'How to drop a file from explorer and get it's full path to electronjs app'
			//https://www.electronjs.org/docs/latest/api/web-utils !!!! 'webUtils.getPathForFile(file)'
			/*
				// Before
				const oldPath = document.querySelector('input').files[0].path

				// After
				const { webUtils } = require('electron')
				const newPath = webUtils.getPathForFile(document.querySelector('input').files[0])
			*/
