import { atom, type PrimitiveAtom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { type RowInputState } from "@/ui";
import { getManiDispNameAtomAtom } from "../../2-file-mani-atoms";

export const doOpenConfirmDeleteDialogAtom = atom(false);

// New manifest name

export type ManiNameData = {
    fileUsAtom: FileUsAtom;                     // fileUs to rename
    nameAtom: PrimitiveAtom<RowInputState>;     // new name
    resolve: (ok: boolean) => void;             // ok or cancel
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

        const nameAtom = set(getManiDispNameAtomAtom, fileUsAtom);
        if (!nameAtom) {
            return false;
        }

        const resolveName = new Promise<boolean>((resolve) => {
            set(doOpenManiNameDialogAtom, {
                fileUsAtom: fileUsAtom,
                nameAtom,
                resolve,
            });
        });

        const ok = await resolveName;
        return ok;
    }
);
