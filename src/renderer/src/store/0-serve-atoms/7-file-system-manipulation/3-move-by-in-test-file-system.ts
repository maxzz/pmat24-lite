import { fileSave } from "browser-fs-access";
import { type FileUs } from "@/store/store-types";
import { type R2MInvoke } from "@shared/ipc-types";
import { invokeMainTyped } from "@/xternal-to-main";
import { asyncReloadCache } from "@/store/7-napi-atoms";
import { rootDir } from "@/store/5-1-files";

export async function moveByInTestFileSystem(fileUs: FileUs, inTest: boolean, getset: GetSet): Promise<R2MInvoke.EmptyOkOrError | undefined> {
    const fileCnt = fileUs.fileCnt;
    const content = fileCnt.rawLoaded;

    if (fileUs.fileCnt.fromMain) {
        const oldPath = fileCnt.fpath;
        const newPath = inTest ? `${fileCnt.fpath}/c` : rootDir.fpath;

        const oldFullName = `${oldPath}/${fileCnt.fname}`;
        const newFullName = `${newPath}/${fileCnt.fname}`;

        let emptyOkOrError = await moveFromMain({ oldFullName, newFullName, content });
        if (emptyOkOrError) {
            return emptyOkOrError;
        }
        
        //TODO: check that we run not from the cache folder

        fileCnt.fpath = newPath; //TODO: update fileCnt: path and handle. Should it be reactive?
    } else {
        return 'Not yet implemented';
        // return await moveFromWeb({ fileUs, content, inTest });
    }
}

async function moveFromMain({ oldFullName, newFullName, content }: { oldFullName: string; newFullName: string; content: string; }): Promise<R2MInvoke.EmptyOkOrError | undefined> {
    let emptyOkOrError = await invokeMainTyped({ type: 'r2mi:save-file', fileName: newFullName, content });

    if (!emptyOkOrError) {
        emptyOkOrError = await invokeMainTyped({ type: 'r2mi:delete-file', fileName: oldFullName });
    }

    return emptyOkOrError;
}

async function moveFromWeb({ fileUs, content, inTest }: { fileUs: FileUs; content: string; inTest: boolean; }): Promise<R2MInvoke.EmptyOkOrError | undefined> {
    const fileCnt = fileUs.fileCnt;
    const fileName = fileCnt.fname; //TODO: this is wromg, temp

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

//TODO: web save to new, delete old, and update fileCnt: path and handle
