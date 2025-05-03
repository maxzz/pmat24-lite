import { atom, PrimitiveAtom } from "jotai";
import { hasMain, R2MCalls } from "@/xternal-to-main";
import { doClose_SawMonitorAtom } from "@/store";

export const doTurnOnSawModeOnClientAtom = atom(
    null,
    (get, set) => {
        set(doSawModeOnClientAtom, { turnOn: true, canceledByMain: false });
    }
);

export const doTurnOffSawModeOnClientAtom = atom(
    null,
    (get, set) => {
        set(doSawModeOnClientAtom, { turnOn: false, canceledByMain: hasMain(), cancelByMainAtom: doClose_SawMonitorAtom });
    }
);

/**
 * This is called from main (gate-react-listener-atom.ts) to cancel the Saw mode.
 */
export const doCancelSawModeByMainAtom = atom(
    null,
    (get, set) => {
        set(doSawModeOnClientAtom, { turnOn: false, canceledByMain: true, cancelByMainAtom: doClose_SawMonitorAtom });
    }
);

// Implementation

const _sawModeAtom = atom<boolean>(false);

type DoSawModeOnClientAtomParams = {
    turnOn: boolean;                        // is to set the mode on or off
    canceledByMain: boolean;                // is set if app close button was pressed from main process
    cancelByMainAtom?: PrimitiveAtom<void>; // cancel will be set to false when mode is turnned off by main process
};

const doSawModeOnClientAtom = atom(
    null,
    (get, set, { turnOn, canceledByMain, cancelByMainAtom }: DoSawModeOnClientAtomParams) => {
        const isOn = get(_sawModeAtom);

        if (turnOn) {
            if (isOn) {
                return;
            }

            R2MCalls.setSawModeOnMain({ setOn: true });
            set(_sawModeAtom, true);
        } else {
            if (!isOn) {
                return;
            }

            canceledByMain && cancelByMainAtom && set(cancelByMainAtom);

            R2MCalls.setSawModeOnMain({ setOn: false });
            set(_sawModeAtom, false);
        }
    }
);

//TODO: check what we do on cancel from main.
