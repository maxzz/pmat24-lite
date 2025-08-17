import { fileSave } from "browser-fs-access";
import { type FileUs } from "@/store/store-types";
import { type R2MInvoke } from "@shared/ipc-types";
import { invokeMainTyped } from "@/xternal-to-main";
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

        fileCnt.fpath = newPath; //TODO: Should fpath be reactive?
    } else {
        return await moveFromWeb({ fileUs, content, inTest });
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
    const fileName = fileCnt.fname;

    const webFsItem = fileCnt.webFsItem;
    if (!webFsItem || !rootDir.handle) {
        return 'Cannot move wo/ webFsItem';
    }

    const ownerHandle = webFsItem.owner;
    if (!ownerHandle) {
        return 'Cannot move wo/ ownerHandle';
    }

    if ((inTest && ownerHandle.name === 'c') || (!inTest && ownerHandle.name !== 'c')) {
        return; // Already in the right mode
    }

    const newDirHandle = inTest ? await rootDir.handle.getDirectoryHandle('c', { create: true }) : rootDir.handle;
    if (!newDirHandle) {
        return 'Cannot get new directory handle';
    }

    const newPath = inTest ? `${rootDir.fpath}/c` : rootDir.fpath;

    const blob = new Blob([content], { type: 'text/xml' });
    const newFileHandle = await newDirHandle.getFileHandle(fileName, { create: true });
    const fileSystemHandle = await fileSave(blob, { fileName }, newFileHandle);
    await ownerHandle.removeEntry(fileName);

    webFsItem.owner = newDirHandle;
    webFsItem.handle = fileSystemHandle;
    fileCnt.fpath = newPath;

    return undefined;
}
