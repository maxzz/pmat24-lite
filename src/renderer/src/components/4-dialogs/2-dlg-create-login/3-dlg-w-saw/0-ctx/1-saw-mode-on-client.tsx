import { atom } from "jotai";
import { doOpenCreateManiSawAtom, doOpenSawOverlayAtom } from "@/store";
import { hasMain, sendToMain } from "@/xternal-to-main";

/**
 * @param canceledByMain - is set if app close button was pressed from main process
 */
export const sawModeOnClientAtom = atom(
    get => get(_sawModeAtom),
    (get, set, { turnOn, canceledByMain }: { turnOn: boolean; canceledByMain: boolean; }) => {
        const isOn = get(_sawModeAtom);

        if (turnOn) {
            if (isOn) {
                return;
            }

            if (hasMain()) {
                sendToMain({ type: 'r2m:set-saw-mode', setOn: true });
            }
            set(_sawModeAtom, true);
            return;
        } else {
            if (canceledByMain) {
                // set(doOpenCreateManiSawAtom, false);
                set(doOpenSawOverlayAtom, false);
            } else if (hasMain()) {
                sendToMain({ type: 'r2m:set-saw-mode', setOn: false });
            }
            set(_sawModeAtom, false);
        }
    }
);

const _sawModeAtom = atom<boolean>(false);

export const isSawModeAtom = atom(
    get => get(_sawModeAtom)
);
