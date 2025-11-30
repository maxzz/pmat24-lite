import { atom } from "jotai";
import { asyncVerifyPermission, errorToString } from "@/utils";
import { hasMain, invokeMainTyped } from "@/xternal-to-main";
import { notice } from "@/ui/local-ui/7-toaster";
import { type FileContent } from "@shared/ipc-types";
import { doCloseRootDirAtom, type PmatFolder } from "@/store/5-1-open-files";
import { filerDirectoryHandles, findShortestPathInFnames } from "@/store/store-utils";
import { doSetDeliveredFilesAtom } from "../../1-do-set-files";
import { openDirectoryHandle, openModernHandlesDlg, type OpenModernHandlesDlgResult } from "../1-modern-handles";
import { createFileContents_From_Main } from "./1-filecnt-from-main";
import { createFileContents_FromMru_Main } from "./2-filecnt-from-main-mru";
import { createFileContents_WebAfterDlgOpen } from "./4-filecnt-from-web-dlg";
import { createFileContents_WebAfterDnd } from "./3-filecnt-from-web-dnd";
import { asyncRemoveMruItemAtom } from "@/store/4-dialogs-atoms";
import { printFiles } from "./9-types";

export type DoSetFilesFrom_Dnd_Atom = typeof doSetFilesFrom_Dnd_Atom;

/**
 * Accepts File[] extracted synchronously from the drop event.
 * IMPORTANT: Files must be extracted synchronously in the drop handler because 
 * dataTransfer.files/items become empty after the event completes (browser clears them).
 * This is especially critical in Electron where async access fails.
 */
export const doSetFilesFrom_Dnd_Atom = atom(                    // used by DropItDoc only
    null,
    async (get, set, dataTransfer: DataTransfer, dropFiles: File[]) => {

        if (!await set(doCloseRootDirAtom)) {
            return;
        }

        if (hasMain()) {
            // const dropFiles: File[] = [...dataTransfer.files];
            if (dropFiles.length) {                            // avoid drop-and-drop drop without files
                const res = await createFileContents_From_Main(dropFiles);

                if (res?.error) {
                    const m = res.error.match(/ENOENT: no such file or directory:'([^']*)'/); //ENOENT: no such file or directory:'\\Tanam11\c\Y\w\112'
                    notice.error(m ? `Unable to access "${m[1]}"` : res.error);
                    return;
                }

                if (res?.deliveredFileContents?.length || res?.noItemsJustDir) { // avoid drop-and-drop drop without files
                    set(doSetDeliveredFilesAtom, res);
                }
            }
        } else {
            const fileDataTransferItems = [...dataTransfer.items].filter((item) => item.kind === 'file');
            if (fileDataTransferItems.length) {                // avoid drop-and-drop drop without files
                const res = await createFileContents_WebAfterDnd(fileDataTransferItems);
                const hasFolder = res?.root?.handle?.kind === 'directory';

                if (res?.deliveredFileContents?.length || hasFolder) { // avoid drop-and-drop drop without files
                    set(doSetDeliveredFilesAtom, res);
                }
            }
        }
    }
);

export const doSetFilesFrom_LegacyDlg_Atom = atom( // with input type="file" element
    null,
    async (get, set, fileList: FileList | null) => {
        const files = fileList ? [...fileList] : [];
        if (!files.length) {
            return;
        }

        if (hasMain()) {
            const res = await createFileContents_From_Main(files);

            if (res?.deliveredFileContents || res?.noItemsJustDir) {
                set(doSetDeliveredFilesAtom, res);
            }
        } else {
            const deliveredFileContents = await createFileContents_WebAfterDlgOpen(files);
            const root = {
                fpath: findShortestPathInFnames(deliveredFileContents.map((item) => item.fpath)),
                handle: undefined,
                fromMain: false,
            };
            if (deliveredFileContents) {
                set(doSetDeliveredFilesAtom, { deliveredFileContents, root, noItemsJustDir: false, error: undefined, });
            }
        }
    }
);

export const doSetFilesFrom_ModernDlg_Atom = atom( // with directory open dialog from "browser-fs-access" package
    null,
    async (get, set, { openAsFolder }: { openAsFolder: boolean; }) => {
        try {
            const { files, root }: OpenModernHandlesDlgResult = await openModernHandlesDlg(openAsFolder);
            //printFiles(files);

            if (!hasMain()) { // This is not supported by electron due to electronGetPaths() limitations (used legacy dlg instead)
                const deliveredFileContents: FileContent[] = files ? await createFileContents_WebAfterDlgOpen(files) : [];
                set(doSetDeliveredFilesAtom, { deliveredFileContents, root: { ...root, fromMain: false }, noItemsJustDir: false, error: undefined, });
            }
        } catch (error) {
            !errorToString(error).includes('user aborted') && console.error(error);
        }
    }
);

export const doSetFilesFrom_MruFolder_Atom = atom(
    null,
    async (get, set, { folder }: { folder: PmatFolder; }): Promise<void> => {

        if (hasMain()) {
            const { exists } = await invokeMainTyped({ type: 'r2mi:file-exists', fileName: folder.fpath });
            if (!exists) {
                await set(asyncRemoveMruItemAtom, folder);
                return;
            }

            //TODO: check if folder exists
            const res = await createFileContents_FromMru_Main(folder);
            if (res?.deliveredFileContents) {
                set(doSetDeliveredFilesAtom, res);
            }
            return;
        }

        // 2. Non electron version
        try {
            if (!folder.handle) {
                console.error('handle is undefined');
                return;
            }

            if (!await asyncVerifyPermission({ handle: folder.handle, readWrite: true })) {
                return;
            }

            const files = filerDirectoryHandles(await openDirectoryHandle(folder.handle, { recursive: true }));
            //printFiles(files);

            let deliveredFileContents: FileContent[] = files ? await createFileContents_WebAfterDlgOpen(files) : [];
            set(doSetDeliveredFilesAtom, { deliveredFileContents, root: folder, noItemsJustDir: false, error: undefined, });

        } catch (error) {
            console.log('MRU.item.invalid', folder, error); // we don't call setRootDir(undefined); here to keep already open folder or welcome screen
            await set(asyncRemoveMruItemAtom, folder);
        }
    }
);
