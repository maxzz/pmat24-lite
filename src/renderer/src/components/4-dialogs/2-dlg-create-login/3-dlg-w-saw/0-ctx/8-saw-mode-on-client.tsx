import { atom, PrimitiveAtom } from "jotai";
import { doOpenSawOverlayAtom } from "@/store";
import { hasMain, sendToMain } from "@/xternal-to-main";

const _sawModeAtom = atom<boolean>(false);

/**
 * @param turnOn - is to set the mode on or off
 * @param canceledByMain - is set if app close button was pressed from main process
 * @param cancelAtom - cancel will be set to false when mode is turnned off by main process
 */
export const doSawModeOnClientAtom = atom(
    null,
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

            canceledByMain && cancelByMainAtom && set(cancelByMainAtom, false);

            if (hasMain()) {
                sendToMain({ type: 'r2m:set-saw-mode', setOn: false });
            }

            set(_sawModeAtom, false);
        }
    }
);

export const isSawModeOnClientAtom = atom(
    get => get(_sawModeAtom)
);

export const doTurnOffSawModeOnClientAtom = atom(
    null,
    (get, set) => {
        set(doSawModeOnClientAtom, { turnOn: false, canceledByMain: hasMain(), cancelByMainAtom: doOpenSawOverlayAtom });
    }
);

/**
 * This is called from main (gate-react-listener-atom.ts) to cancel the Saw mode.
 */
export const doCancelSawModeByMainAtom = atom(
    null,
    (get, set) => {
        set(doSawModeOnClientAtom, { turnOn: false, canceledByMain: true, cancelByMainAtom: doOpenSawOverlayAtom });
    }
);

//TODO: check what we do on cancel from main.
