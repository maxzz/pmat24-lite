import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { type FileUs, filesAtom, removeFromTotalManis, rightPanelAtom, rootDir } from "@/store";
import { doDisposeFileUsAtomAtom } from "@/store/store-utils";
import { hasMain, invokeMainTyped } from "@/xternal-to-main";
import { errorToString } from "@/utils";
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

        //right panel
        set(rightPanelAtom, undefined);

        // 3.3. dispose edit atoms, after all done to avoid UI updates
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
    }
);
