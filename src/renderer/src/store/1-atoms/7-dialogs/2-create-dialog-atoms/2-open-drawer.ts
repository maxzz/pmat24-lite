import { newManiCtx } from "@/components/4-dialogs/2-dlg-create-login/1-body/0-new-mani-ctx";
import { atom } from "jotai";

// Drawer atoms

const _doOpenDrawerAtom = atom(false);

export const doOpenDrawerAtom = atom(
    (get) => get(_doOpenDrawerAtom),
    (get, set, open: boolean) => {
        if (open) {
            set(newManiCtx.doInitAtom, { ctx: newManiCtx });
        }
        set(_doOpenDrawerAtom, open);
    }
);
