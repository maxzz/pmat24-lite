import { atom } from "jotai";
import { newManiCtx } from "@/components/4-dialogs/2-dlg-create-login/x-1-nun-dlg-w-screenshots/0-new-mani-ctx";

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
