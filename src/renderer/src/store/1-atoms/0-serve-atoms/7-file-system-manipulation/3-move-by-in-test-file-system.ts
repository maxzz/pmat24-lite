import { errorToString } from "@/utils";
import { fileSave } from "browser-fs-access";
import { type FileUs } from "@/store/store-types";
import { rootDir } from "@/store/1-atoms/1-files";
import { invokeMainTyped } from "@/xternal-to-main";

/**
 * Save file to the file system.
 * @param fileUs - fileUs
 * @param content - file content
 * @param fileName - filename wo/ path
 * @returns error message or empty string
 */
export async function moveByInTestFileSystem(fileUs: FileUs, inTest: boolean, getset: GetSet): Promise<string | undefined> {
    try {
        const fileCnt = fileUs.fileCnt;
        const content = fileCnt.rawLoaded;
        const fileName = fileCnt.fname;

        if (fileUs.fileCnt.fromMain) {
            return await moveFromMain({ fileName: `${fileUs.fileCnt.fpath}/${fileName}`, content });
        } else {
            return await moveFromWeb({ fileUs, content, fileName });
        }
    } catch (error) {
        return errorToString(error);
    }
}

async function moveFromMain({ fileName, content }: { fileName: string; content: string; }): Promise<string | undefined> {
    const emptyOkOrError = await invokeMainTyped({ type: 'r2mi:save-file', fileName, content });
    return emptyOkOrError;
}

async function moveFromWeb({ fileUs, content, fileName }: { fileUs: FileUs; content: string; fileName: string; }): Promise<string | undefined> {
    const fileCnt = fileUs.fileCnt;
    const webFsItem = fileCnt.webFsItem;
    if (!webFsItem) {
        return 'Cannot save wo/ webFsItem';
    }

    const needRename = fileName !== fileCnt.fname;
    let handle = webFsItem.handle?.kind === 'file' ? webFsItem.handle : null;
    // let deletePrevName = needRename && handle;

    if (needRename || fileCnt.newFile) {
        handle = rootDir.handle ? await rootDir.handle.getFileHandle(fileName, { create: true }) : null;
    }

    const blob = new Blob([content], { type: 'text/xml' });
    const fileSystemHandle = await fileSave(blob, { fileName }, handle);
    webFsItem.handle = fileSystemHandle;

    // if (deletePrevName) { await rootDir.handle?.removeEntry(fileUs.fileCnt.fname); }

    return undefined;
}
