import { atom } from "jotai";
import { FileUsAtom } from "@/store";

export const doOpenConfirmDeleteDialogAtom = atom(false);

// New manifest name

export type ManiNameData = {
    fileUsAtom: FileUsAtom;         // fileUs to rename
    resolve: (ok: boolean) => void; // ok or cancel
};

export const doOpenManiNameDialogAtom = atom<ManiNameData | undefined>(undefined); // TODO: show only if name is invalid

/**
 * Verify new manifest name before save manifest.
 */
export const doVerifyManiNameAtom = atom(
    null,
    async (get, set, fileUsAtom: FileUsAtom): Promise<boolean> => {
        if (!fileUsAtom) {
            return false;
        }

        const resolveName = new Promise<boolean>((resolve) => {
            set(doOpenManiNameDialogAtom, {
                fileUsAtom: fileUsAtom,
                resolve,
            });
        });

        const ok = await resolveName;
        return ok;
    }
);
