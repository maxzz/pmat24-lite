import { atom, PrimitiveAtom } from "jotai";
import { doOpenSawOverlayAtom } from "@/store";
import { hasMain, sendToMain } from "@/xternal-to-main";

/**
 * @param turnOn - is to set the mode on or off
 * @param canceledByMain - is set if app close button was pressed from main process
 * @param cancelAtom - cancel will be set to false when mode is turnned off by main process
 */
export const sawModeOnClientAtom = atom(
    get => get(_sawModeAtom),
    (get, set, { turnOn, canceledByMain, cancelByMainAtom }: { turnOn: boolean; canceledByMain: boolean; cancelByMainAtom?: PrimitiveAtom<boolean>; }) => {
        const isOn = get(_sawModeAtom);

        if (turnOn) {
            if (isOn) {
                return;
            }

            if (hasMain()) {
                sendToMain({ type: 'r2m:set-saw-mode', setOn: true });
            }

            set(_sawModeAtom, true);
        } else {
            if (!isOn) {
                return;
            }

            if (canceledByMain) {
                cancelByMainAtom && set(cancelByMainAtom, false); //TODO: Do we need to reset only if canceledByMain? Later.
            }
            else {
                if (hasMain()) {
                    sendToMain({ type: 'r2m:set-saw-mode', setOn: false });
                }
            }

            set(_sawModeAtom, false);
        }
    }
);

const _sawModeAtom = atom<boolean>(false);

export const doTurnOffSawModeOnClientAtom = atom(
    null,
    (get, set) => {
        set(sawModeOnClientAtom, { turnOn: false, canceledByMain: false, cancelByMainAtom: doOpenSawOverlayAtom });
    }
);

export const doCancelSawModeByMainAtom = atom(
    null,
    (get, set) => {
        set(sawModeOnClientAtom, { turnOn: false, canceledByMain: true, cancelByMainAtom: doOpenSawOverlayAtom });
    }
);
