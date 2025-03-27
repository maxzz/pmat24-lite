import { atom } from "jotai";
import { errorToString } from "@/utils";
import { hasMain } from "@/xternal-to-main";
import { type FileContent } from "@shared/ipc-types";
import { type OpenModernHandlesDlgResult, filerDirectoryHandles, openDirectoryHandle, openModernHandlesDlg } from "@/store/store-utils";
import { type PmatFolder, setRootDir } from "../../0-files-atom";
import { doSetDeliveredFilesAtom } from "../../1-do-set-files";
import { createFileContents_WebAfterDnd, createFileContents_WebAfterDlgOpen, createFileContents_From_Main, createFileContents_FromMru_Main } from "./1-create-web-file-contents";
import { snapshot } from "valtio";

// handle files drop for web and electron environments

export type DoSetFilesFrom_Dnd_Atom = typeof doSetFilesFrom_Dnd_Atom;

export const doSetFilesFrom_Dnd_Atom = atom(            // used by DropItDoc only
    null,
    async (get, set, dataTransfer: DataTransfer) => {
        let fileContents: FileContent[] | undefined;

        if (hasMain()) {
            const dropFiles: File[] = [...dataTransfer.files];
            if (dropFiles.length) {                     // avoid drop-and-drop drop without files
                fileContents = await createFileContents_From_Main(dropFiles);
            }
        } else {
            const fileDataTransferItems = [...dataTransfer.items].filter((item) => item.kind === 'file');
            if (fileDataTransferItems.length) {         // avoid drop-and-drop drop without files
                fileContents = await createFileContents_WebAfterDnd(fileDataTransferItems);
            }
        }

        if (!fileContents?.length) {                    // avoid drop-and-drop drop without files
            return;
        }

        fileContents && set(doSetDeliveredFilesAtom, fileContents);
    }
);

export const doSetFilesFrom_LegacyDlg_Atom = atom(
    null,
    async (get, set, fileList: FileList | null) => {
        const files = fileList ? [...fileList] : [];
        if (!files.length) {
            return;
        }

        let fileContents: FileContent[] | undefined;

        if (hasMain()) {
            fileContents = await createFileContents_From_Main(files);
        } else {
            fileContents = await createFileContents_WebAfterDlgOpen(files);
        }

        if (fileContents) {
            set(doSetDeliveredFilesAtom, fileContents);
        }
    }
);

export const doSetFilesFrom_ModernDlg_Atom = atom(
    null,
    async (get, set, { openAsFolder }: { openAsFolder: boolean; }) => {
        try {
            const { files, root }: OpenModernHandlesDlgResult = await openModernHandlesDlg(openAsFolder);
            setRootDir({ rpath: root.rpath, handle: root.handle, fromMain: false });

            printFiles(files);

            if (!hasMain()) { // This is not supported by electron due to electronGetPaths() limitations (used legacy dlg instead)
                let filesCnt: FileContent[] = files ? await createFileContents_WebAfterDlgOpen(files) : [];
                if (filesCnt) {
                    set(doSetDeliveredFilesAtom, filesCnt);
                }
            }
        } catch (error) {
            !errorToString(error).includes('user aborted') && console.error(error);
        }
    }
);

export const doSetFilesFrom_MruFolder_Atom = atom(
    null,
    async (get, set, { folder }: { folder: PmatFolder; }) => {
        console.log('doSetFilesFrom_MruFolder_Atom', folder);

        if (hasMain() && folder.fromMain) {
            const fileContents = await createFileContents_FromMru_Main(folder);
            if (fileContents) {
                set(doSetDeliveredFilesAtom, fileContents);
            }
        } else {
            try {
                if (!folder.handle) {
                    console.error('Mru folder has no handle', folder);
                    return;
                }

                const options: FileSystemHandlePermissionDescriptor = { mode: 'readwrite' };
                if (await folder.handle.queryPermission(options) !== 'granted') {
                    if ((await folder.handle.requestPermission(options)) !== 'granted') {
                        console.error('Mru folder handle permission denied', folder);
                        return;
                    }
                }

                const files = filerDirectoryHandles(await openDirectoryHandle(folder.handle, { recursive: true }));

                let filesCnt: FileContent[] = files ? await createFileContents_WebAfterDlgOpen(files) : [];
                if (filesCnt) {
                    set(doSetDeliveredFilesAtom, filesCnt);
                }
            } catch (error) {
                console.error('Mru folder handle is invalid', folder);
                return;
            }
        }

        setRootDir(folder);
    }
);

/**
 * Verify that the user has granted permission to read and write to the file.
 * @param handle - The file or directory handle to verify.
 * @param readWrite - Whether to check for read and write permissions.
 * @returns - A promise that resolves to true if the user has granted permission, or false otherwise.
 */
/*TODO: export*/ async function verifyPermission(handle: FileSystemFileHandle, readWrite: boolean): Promise<boolean> {
    const options: FileSystemHandlePermissionDescriptor = {};
    if (readWrite) {
        options.mode = 'readwrite';
    }

    // Check if permission was already granted. If so, return true.
    if ((await handle.queryPermission(options)) === 'granted') {
        return true;
    }

    // Request permission. If the user grants permission, return true.
    if ((await handle.requestPermission(options)) === 'granted') {
        return true;
    }

    // The user didn't grant permission, so return false.
    return false;
}

//TODO: somehow 'ccopies-from-here' is not working first time and shows 'Opening multiple files or folders is not allowed. Drag and drop one folder.' and on second time OK.

//

function printFiles(files: File[]) {
    console.log('%cdoSetFilesFrom_ModernDlg_Atom', 'color: magenta');
    files.forEach((f) => console.log(' ', f));
}

//