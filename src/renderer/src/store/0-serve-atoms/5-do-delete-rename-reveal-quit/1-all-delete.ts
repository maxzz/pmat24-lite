import { atom } from "jotai";
import { toast } from "sonner";
import { FormIdx, rebuildMetaFormsWithoutCpassForm } from "@/store/manifest";
import { type FileUsAtom } from "@/store/store-types";
import { removeFromTotalManis } from "@/store/9-ui-state";
import { fileUsChanges, type ManiAtoms } from "@/store/2-file-mani-atoms/9-types";
import { filesAtom } from "@/store/5-files";
import { doDisposeFileUsAtomAtom } from "@/store/store-utils";
import { confirmDeleteCpassMessages, confirmDeleteMessages, doAsyncExecuteConfirmDialogAtom } from "@/store/4-dialogs-atoms";
import { rightPanelAtomAtom, setManiActiveTab } from "@/store/5-right-panel";
import { deleteFileFromFileSystem } from "../7-file-system-manipulation";
import { inTest_Set } from "@/store/7-napi-atoms";

export const doDeleteFileUsAtom = atom(null,
    async (get, set, fileUsAtom: FileUsAtom) => {
        const fileUs = get(fileUsAtom);
        if (!fileUs || fileUs.parsedSrc.stats.isFCat) {
            return;
        }

        // 1. find file in files tree
        const files = get(filesAtom);
        if (files.indexOf(fileUsAtom) === -1) {
            console.error('not in filesAtom', fileUs);
            return;
        }

        // 2. confirm delete
        const ok = await set(doAsyncExecuteConfirmDialogAtom, confirmDeleteMessages);
        if (!ok) {
            return;
        }

        // 3. delete phisical file from file system
        const res = await deleteFileFromFileSystem(fileUs);
        if (res) {
            toast.error(`Cannot delete file: ${res}`);
            return;
        }

        if (get(fileUs.maniInTestAtom)) {
            await inTest_Set({ fileUs, inTest: false, deleteFile: true });
        }

        // 4.1. clear right panel
        set(rightPanelAtomAtom, undefined);

        // 4.2. remove from files tree
        const newFiles = files.filter((item) => item !== fileUsAtom);
        set(filesAtom, newFiles);

        // 4.3. update counters
        removeFromTotalManis(fileUs);

        // 4.4. clear file changes
        fileUsChanges.setUnchanged({ fileUs });

        // 5. dispose edit atoms, after all done to avoid UI updates
        printDeleteFile(fileUsAtom);
        set(doDisposeFileUsAtomAtom, fileUsAtom);
    }
);

export const doDeleteCpassFromFileUsAtom = atom(null,
    async (get, set, fileUsAtom: FileUsAtom) => {
        const fileUs = get(fileUsAtom);
        if (!fileUs || fileUs.parsedSrc.stats.isFCat || !fileUs.parsedSrc.mani || !fileUs.parsedSrc.meta) {
            return;
        }

        // get maniAtoms
        const maniAtoms = get(fileUs.maniAtomsAtom);
        if (!maniAtoms?.[FormIdx.cpass]) {
            return;
        }

        const ok = await set(doAsyncExecuteConfirmDialogAtom, confirmDeleteCpassMessages);
        if (!ok) {
            return;
        }

        // update parsedSrc meta and mani forms
        rebuildMetaFormsWithoutCpassForm(fileUs.parsedSrc.meta, fileUs.parsedSrc.mani.forms);

        // update maniAtoms
        const loginForm = maniAtoms[FormIdx.login];
        const newManiAtoms: ManiAtoms = [loginForm, undefined, loginForm?.fieldsAtom || atom([]), atom([])];
        set(fileUs.maniAtomsAtom, newManiAtoms);

        // set file changed
        const state = fileUsChanges.hasCpassChange({ fileUs }) ? false : true; // if cpass was added then set as unchanged
        fileUsChanges.setCpass({ fileUs }, state);

        setManiActiveTab('options');
    }
);

function printDeleteFile(fileUsAtom: FileUsAtom | undefined) {
    console.groupCollapsed(`🛑🛑🛑 deleteFile: ${fileUsAtom ? fileUsAtom.toString() : 'null'}`);
    console.trace();
    console.groupEnd();
}

//TODO: from empty folder create manifest, delete manifest, create manifest, save -> crash in ManiEditorFormSelector
//TODO: from empty folder create manifest, for win32, save, delete, create. continue -> crash in ManiEditorFormSelector
//TODO: from empty folder create manifest, for explorer -> crash in ManiEditorFormSelector
//TODO: from empty folder create manifest, wo/ fields, save -> we have indicator unsaved, but file not exists
//TODO: after deleted the last create new will fail
