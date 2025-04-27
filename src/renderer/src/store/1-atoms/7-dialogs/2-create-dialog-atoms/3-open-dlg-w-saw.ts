import { atom } from "jotai";
import { doDisposeFileUsAtomAtom, newManiContent } from "@/store";

const _isDlgOpenAtom = atom(false);

export const doOpenDlgNewManiSawAtom = atom(
    (get) => get(_isDlgOpenAtom),
    (get, set, open: boolean) => {
        if (open) {
            if (newManiContent.maniForCpassAtom) { // cpass dialog is embedded, so don't open dialog
                return;
            }
        } else {
            const newFileUsAtomAtom = get(newManiContent.newFileUsAtomAtom);
            set(newManiContent.newFileUsAtomAtom, undefined);
            set(doDisposeFileUsAtomAtom, newFileUsAtomAtom); // The previuos operation will clean up the fileUsAtom if it was saved otherwise it will be undefined.
        }
        set(_isDlgOpenAtom, open);
    }
);
