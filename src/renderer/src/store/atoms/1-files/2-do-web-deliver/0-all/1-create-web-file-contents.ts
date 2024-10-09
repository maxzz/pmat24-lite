import { type WebFsItem, type FileContent, pmAllowedToOpenExt } from "@shared/ipc-types";
import { textFileReaderPromisify } from "./8-text-file-reader";
import { isAllowedExt, pathWithoutFilename, uuid } from "@/utils";
import { collectDndItems } from "./2-collect-dnd-items";

type DropItem = {
    fname: string;                          // basename as filename w/ extension but wo/ path
    fpath: string;                          // file path without filename
    fileWeb: File;                          // web: File object from async entry.file() call
    webFsItem: WebFsItem | null;            // web: for files loaded without electron
    notOur: boolean;                        // load of file content was blocked by allowedExt list.
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

                webFsItem: item.webFsItem,

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

    let items: DropItem[] = await mapToDropItems(fileDataTransferItems);

    allowedExt && items.forEach((item) => item.notOur = !isAllowedExt(item.fname, allowedExt));

    const rv = loadFilesAndCreateFileContents(items);
    return rv;

    async function mapToDropItems(fileDataTransferItems: DataTransferItem[]): Promise<DropItem[]> {

        const dndItems = (await collectDndItems(fileDataTransferItems)).filter((item) => item.file);

        let rv: DropItem[] = [];
        try {
            rv = dndItems.map(
                (item) => {
                    const rv: DropItem = {
                        fname: item.file!.name,
                        fpath: pathWithoutFilename(item.path),
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
