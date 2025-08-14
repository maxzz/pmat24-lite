import { fileSave } from "browser-fs-access";
import { type FileUs } from "@/store/store-types";
import { rootDir } from "@/store/1-atoms/1-files";
import { invokeMainTyped } from "@/xternal-to-main";
import { errorToString } from "@/utils";
import { a } from "@react-spring/web";

/**
 * Save file to the file system.
 * @param fileUs - fileUs
 * @param content - file content
 * @param fileName - filename wo/ path
 * @returns error message or empty string
 */
export async function saveToFileSystem(fileUs: FileUs, content: string, fileName: string): Promise<string | undefined> {
    try {
        if (fileUs.fileCnt.fromMain) {
            return await saveFromMain({ fileName: `${fileUs.fileCnt.fpath}/${fileName}`, content });
        } else {
            return await saveFromWeb(fileUs, content, fileName);
        }
    } catch (error) {
        return errorToString(error);
    }
}

async function saveFromMain({ fileName, content }: { fileName: string; content: string; }): Promise<string | undefined> {
    const emptyOkOrError = await invokeMainTyped({ type: 'r2mi:save-file', fileName, content });
    return emptyOkOrError;
}

async function saveFromWeb(fileUs: FileUs, content: string, fileName: string): Promise<string | undefined> {
    const webFsItem = fileUs.fileCnt.webFsItem;
    if (!webFsItem) {
        return 'Cannot save wo/ webFsItem';
    }

    const blob = new Blob([content], { type: 'text/xml' });

    const needRename = fileName !== fileUs.fileCnt.fname;
    let handle = webFsItem.handle?.kind === 'file' ? webFsItem.handle : null;
    // let deletePrevName = needRename && handle;

    if (needRename || fileUs.fileCnt.newFile) {
        handle = rootDir.handle ? await rootDir.handle.getFileHandle(fileName, { create: true }) : null;
    }

    const fileSystemHandle = await fileSave(blob, { fileName }, handle);
    webFsItem.handle = fileSystemHandle;

    // if (deletePrevName) { await rootDir.handle?.removeEntry(fileUs.fileCnt.fname); }

    return undefined;

}
