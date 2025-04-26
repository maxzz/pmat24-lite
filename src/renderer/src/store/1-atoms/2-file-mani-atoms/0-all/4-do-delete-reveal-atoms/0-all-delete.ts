import { atom } from "jotai";
import { errorToString } from "@/utils";
import { FormIdx, rebuildMetaFormsWithoutCpassForm } from "@/store/manifest";
import { type FileUsAtom } from "@/store/store-types";
import { type FileUs, ManiAtoms, fileUsChanges, filesAtom, removeFromTotalManis, rightPanelAtom, rootDir } from "@/store";
import { doDisposeFileUsAtomAtom } from "@/store/store-utils";
import { hasMain, invokeMainTyped } from "@/xternal-to-main";
import { toast } from "sonner";

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

        // 2. delete phisical file from file system
        const res = await deleteFileFromFileSystem(fileUs);
        if (res) {
            toast.error(`Cannot delete file: ${res}`);
            return;
        }

        // 3.1. remove from files tree
        const newFiles = files.filter((item) => item !== fileUsAtom);
        set(filesAtom, newFiles);

        // 3.2. update counters
        removeFromTotalManis(fileUs);

        // 3.3. clear right panel
        set(rightPanelAtom, undefined);

        // 3.4. clear file changes
        fileUsChanges.setUnchanged({ fileUs });

        // 4. dispose edit atoms, after all done to avoid UI updates
        printDeleteFile(fileUsAtom);
        set(doDisposeFileUsAtomAtom, fileUsAtom);
    }
);

async function deleteFileFromFileSystem(fileUs: FileUs): Promise<string | undefined> {
    if (fileUs.fileCnt.newFile) { // new file is not saved to file system yet
        return undefined;
    }
    try {
        if (hasMain()) {
            const fullName = `${fileUs.fileCnt.fpath}/${fileUs.fileCnt.fname}`;
            const res = await invokeMainTyped({ type: 'r2mi:delete-file', fileName: fullName });
            if (res) {
                console.error('Delete error', res);
            }
        } else {
            if (!rootDir.handle) {
                console.error('No rootDir.handle');
                return;
            }
            await rootDir.handle.removeEntry(fileUs.fileCnt.fname);
        }
    } catch (error) {
        console.error('Delete error', error);
        return errorToString(error);
    }
}

export const deleteCpassFromFileUsAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom) => {
        const fileUs = get(fileUsAtom);
        if (!fileUs || fileUs.parsedSrc.stats.isFCat || !fileUs.parsedSrc.mani || !fileUs.parsedSrc.meta) {
            return;
        }

        // get maniAtoms
        const maniAtoms = get(fileUs.maniAtomsAtom);
        if (!maniAtoms?.[FormIdx.cpass]) {
            return;
        }

        // update parsedSrc meta and mani forms
        rebuildMetaFormsWithoutCpassForm(fileUs.parsedSrc.meta, fileUs.parsedSrc.mani.forms);

        // update maniAtoms
        const newManiAtoms: ManiAtoms = [maniAtoms[FormIdx.login], undefined];
        set(fileUs.maniAtomsAtom, newManiAtoms);

        // set file changed
        fileUsChanges.setCpass({ fileUs }, true);
    }
);

function printDeleteFile(fileUsAtom: FileUsAtom | undefined) {
    console.groupCollapsed(`🛑 deleteFile: ${fileUsAtom ? fileUsAtom.toString() : 'null'}`);
    console.trace();
    console.groupEnd();
}

//TODO: from empty folder create manifest, delete manifest, create manifest, save -> crash in ManiEditorFormSelector
//TODO: from empty folder create manifest, for win32, save, delete, create. continue -> crash in ManiEditorFormSelector
//TODO: from empty folder create manifest, for explorer -> crash in ManiEditorFormSelector
//TODO: from empty folder create manifest, wo/ fields, save -> we have indicator unsaved, but file not exists
//TODO: after deleted the last create new will fail
