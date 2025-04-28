import { Atom, atom } from "jotai";
import { FileUsAtom, rightPanelAtom } from "@/store";

export const doOpenConfirmDeleteDialogAtom = atom(false);

type ManiNameData = {
    // fileUsAtom: FileUsAtom;     // fileUs to rename
    // nextAtom: Atom<() => void>; // atom to call when valid name is set (not empty, maybe unique or auto numbered)
    resolve: (ok: boolean) => void; // ok or cancel
};

export const doOpenManiNameDialog2Atom = atom<ManiNameData | undefined>(undefined); // TODO: show only if name is invalid

export const doVerifyNameBeforeSaveAtom = atom(
    null,
    async (get, set) => {
        const fileUsAtom = get(rightPanelAtom);
        if (!fileUsAtom) {
            return;
        }

        const resolveName = new Promise<boolean>((resolve) => {
            set(doOpenManiNameDialog2Atom, {
                // fileUsAtom: fileUsAtom,
                resolve,
            });
        });

        const ok = await resolveName;
        console.log('------------------ok ----------------', ok);

        return resolveName;
    }
);
