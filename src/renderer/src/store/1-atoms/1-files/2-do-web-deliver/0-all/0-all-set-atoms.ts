import { atom } from "jotai";
import { errorToString } from "@/utils";
import { hasMain } from "@/xternal-to-main";
import { type FileContent } from "@shared/ipc-types";
import { type OpenModernHandlesDlgResult, openModernHandlesDlg } from "@/store/store-utils";
import { type PmatFolder, setRootDir } from "../../0-files-atom";
import { doSetDeliveredFilesAtom } from "../../1-do-set-files";
import { createFileContents_WebAfterDnd, createFileContents_WebAfterDlgOpen, createFileContents_From_Main, createFileContents_FromMru_Main } from "./1-create-web-file-contents";

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

        if (folder.fromMain) {
            setRootDir(folder);

            const fileContents = await createFileContents_FromMru_Main(folder);
            if (fileContents) {
                set(doSetDeliveredFilesAtom, fileContents);
            }
        } else {
        }
        
        // const fileContents = await createFileContents_From_Main([await getFileFromPath(fpath)]);
        // if (fileContents) {
        //     set(doSetDeliveredFilesAtom, fileContents);
        // }
    }
);

//

function printFiles(files: File[]) {
    console.log('%cdoSetFilesFrom_ModernDlg_Atom', 'color: magenta');
    files.forEach((f) => console.log(' ', f));
}
