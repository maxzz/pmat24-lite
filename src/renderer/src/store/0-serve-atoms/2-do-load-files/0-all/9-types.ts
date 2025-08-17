import { type WebFsItem } from "@shared/ipc-types";
import { type FileWithHandle, type FileWithDirectoryAndFileHandle } from "browser-fs-access";

export type OpenItem = {
    fname: string;                          // basename as filename w/ extension but wo/ path
    fpath: string;                          // file path without filename
    fileWeb: File;                          // web: File object from async entry.file() call
    webFsItem: WebFsItem | null;            // web: for files loaded without electron
    notOur: boolean;                        // load of file content was blocked by allowedExt list.
};

/**
 * Check if we drop a single folder and can get its handle.
 * fpath with slash is a subfolder item, so we skip any subfolder items to find the root folder.
 */
export function getSingleFolderHandle(items: OpenItem[]): FileSystemDirectoryHandle | undefined {
    const parentsSet = new Set(
        items.map(
            (item) => item.fpath?.indexOf('/') === -1 ? item.webFsItem?.owner : undefined
        ).filter(Boolean)
    );
    const parentHandle = parentsSet.size === 1 ? parentsSet.values().next().value || undefined : undefined;
    return parentHandle;
}

//

export function printFiles(files: File[] | FileWithHandle[] | FileWithDirectoryAndFileHandle[]) {
    console.log('%cdoSetFilesFrom_ModernDlg_Atom', 'color: magenta');
    files?.forEach((f) => console.log(' ', f));
}

export function printElectronFnameFiles(filenames: string[], files: File[]) {
    console.log('%ccreateFileContents_From_Main', 'color: magenta');

    files.forEach((f, idx) => {
        console.log(' ', { f }, `"${filenames[idx]}"`);
    });
}
