import { newManiCtx } from "@/components/4-dialogs/2-dlg-create-login/0-new-mani-ctx";
import { atom } from "jotai";

// Former dialog as drawer atom

const _isDlgOpenAtom = atom(false);

export const doOpenCreateManiAtom = atom(
    (get) => get(_isDlgOpenAtom),
    (get, set, open: boolean) => {
        if (open) {
            set(newManiCtx.doInitAtom, { ctx: newManiCtx });
        }
        set(_isDlgOpenAtom, open);
    }
);
