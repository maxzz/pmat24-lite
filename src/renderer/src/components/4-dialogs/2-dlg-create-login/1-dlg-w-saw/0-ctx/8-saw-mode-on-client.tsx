import { atom, PrimitiveAtom } from "jotai";
import { hasMain, R2MCalls } from "@/xternal-to-main";
import { doClose_SawMonitorAtom } from "@/store";

// doCancelSawModeByMainAtom is called from main (gate-react-listener-atom.ts) to cancel the Saw mode.

export const doCancelSawModeByMainAtom = atom(null, (get, set) => set(setSawMonitorWindowSizeAtom, { turnOn: false, canceledByMain: true, cancelByMainAtom: doClose_SawMonitorAtom }));
export const doTurnOnSawModeOnClientAtom = atom(null, (get, set) => set(setSawMonitorWindowSizeAtom, { turnOn: true, canceledByMain: false }));
export const doTurnOffSawModeOnClientAtom = atom(null, (get, set) => set(setSawMonitorWindowSizeAtom, { turnOn: false, canceledByMain: hasMain(), cancelByMainAtom: doClose_SawMonitorAtom }));

// Implementation

type DoSawModeOnClientAtomParams = {
    turnOn: boolean;                        // Is to set the mode on or off
    canceledByMain: boolean;                // Is set if app close button was pressed from main process
    cancelByMainAtom?: PrimitiveAtom<void>; // Cancel will be set to false when mode is turnned off by main process
};

const setSawMonitorWindowSizeAtom = atom(
    null,
    (get, set, { turnOn, canceledByMain, cancelByMainAtom }: DoSawModeOnClientAtomParams) => {
        const isOn = get(_sawModeStateAtom);

        if (turnOn) {
            if (isOn) {
                return;
            }

            R2MCalls.setSawModeOnMain({ setOn: true });
            set(_sawModeStateAtom, true);
        } else {
            if (!isOn) {
                return;
            }

            canceledByMain && cancelByMainAtom && set(cancelByMainAtom);

            R2MCalls.setSawModeOnMain({ setOn: false });
            set(_sawModeStateAtom, false);
        }
    }
);

const _sawModeStateAtom = atom<boolean>(false); // Is saw mode on or off

//TODO: check what we do on cancel from main.
