import { atom, PrimitiveAtom } from "jotai";
import { doOpenCreateManiSawAtom, doOpenSawOverlayAtom } from "@/store";
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
            return;
        } else {
            if (canceledByMain) {
                // set(doOpenCreateManiSawAtom, false);
                // set(doOpenSawOverlayAtom, false); //TODO: avoid this dependency, by ...
                if (cancelByMainAtom) {
                    set(cancelByMainAtom, false);
                }
            } else if (hasMain()) {
                sendToMain({ type: 'r2m:set-saw-mode', setOn: false });
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

//TODO: get rect monitor is not working in main and fails to default and set mode id not set. Why?
