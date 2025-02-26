import { atom } from "jotai";
import { doOpenCreateManiSawAtom } from "@/store";
import { hasMain, sendToMain } from "@/xternal-to-main";

const _sawModeAtom = atom<boolean>(false);

/**
 * @param canceledByMain - is set if app close button was pressed
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
                set(_sawModeAtom, true);
            }
            return;
        } else {
            if (canceledByMain) {
                set(doOpenCreateManiSawAtom, false);
            }
            set(_sawModeAtom, false);
        }
    }
);
