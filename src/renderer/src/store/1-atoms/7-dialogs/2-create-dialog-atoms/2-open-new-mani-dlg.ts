import { atom } from "jotai";
import { doDisposeFileUsAtomAtom, newManiContent } from "@/store";

export const isOpen_NewManiDlgAtom = atom((get) => get(_isDlgOpenAtom));
export const open_NewManiDlgAtom = atom(() => null, (get, set) => set(doOpenDlgNewManiSawAtom, true));
export const close_NewManiDlgAtom = atom(() => null, (get, set) => set(doOpenDlgNewManiSawAtom, false));

const doOpenDlgNewManiSawAtom = atom(
    (get) => get(_isDlgOpenAtom),
    (get, set, open: boolean) => {
        if (open) {
            if (newManiContent.maniForCpassAtom) { // cpass dialog is embedded, so don't open dialog
                return;
            }
        } else {
            const currentFileUsAtomAtom = get(newManiContent.newFileUsAtomAtom);
            set(newManiContent.newFileUsAtomAtom, undefined);

            set(doDisposeFileUsAtomAtom, currentFileUsAtomAtom); // The previuos operation will clean up the fileUsAtom if it was saved otherwise it will be undefined.
        }

        set(_isDlgOpenAtom, open);
    }
);

const _isDlgOpenAtom = atom(false);
