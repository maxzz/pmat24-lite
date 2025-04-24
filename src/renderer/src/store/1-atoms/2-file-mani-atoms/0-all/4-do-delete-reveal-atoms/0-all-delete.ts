import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { filesAtom, removeFromTotalManis, rightPanelAtom, rootDir } from "@/store";
import { doDisposeFileUsAtomAtom } from "@/store/store-utils";
import { hasMain, invokeMainTyped } from "@/xternal-to-main";

export const doDeleteFileUsAtom = atom(null,
    async (get, set, fileUsAtom: FileUsAtom) => {
        const fileUs = get(fileUsAtom);
        if (!fileUs || fileUs.parsedSrc.stats.isFCat) {
            return;
        }

        // files tree
        const files = get(filesAtom);
        if (files.indexOf(fileUsAtom) === -1) {
            console.error('not in filesAtom', fileUs);
            return;
        }

        const newFiles = files.filter((fileUsAtom) => fileUsAtom !== fileUsAtom);
        set(filesAtom, newFiles);

        // delete file from file system
        if (!fileUs.fileCnt.newFile) { // new file is not saved to file system yet
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
            }
        }

        removeFromTotalManis(fileUs);

        // dispose fields
        set(doDisposeFileUsAtomAtom, fileUsAtom);

        //right panel
        set(rightPanelAtom, undefined);
    }
);

export const deleteCpassFromFileUsAtom = atom(null,
    (get, set, cpassUsAtom: FileUsAtom) => {
    }
);
