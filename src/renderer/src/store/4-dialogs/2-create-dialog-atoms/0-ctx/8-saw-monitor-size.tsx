import { type PrimitiveAtom, atom } from "jotai";
import { appSettings } from "@/store/9-ui-state";
import { hasMain, R2MCalls } from "@/xternal-to-main";
import { close_SawMonitorAtom } from "@/store/4-dialogs";

// doCancelSawModeByMainAtom is called from main (gate-react-listener-atom.ts) to cancel the Saw mode.

export const cancelSizeSmall_SawMonitorAtom = atom(null, (get, set) => set(setWindowSize_SawMonitorAtom, { turnOn: false, canceledByMain: true, cancelByMainAtom: close_SawMonitorAtom }));
export const setSizeSmall_SawMonitorAtom = atom(null, (get, set) => set(setWindowSize_SawMonitorAtom, { turnOn: true, canceledByMain: false }));
export const setSizeNormal_SawMonitorAtom = atom(null, (get, set) => set(setWindowSize_SawMonitorAtom, { turnOn: false, canceledByMain: hasMain(), cancelByMainAtom: close_SawMonitorAtom }));

// Implementation

type DoSawModeOnClientAtomParams = {
    turnOn: boolean;                        // Is to set the mode on or off
    canceledByMain: boolean;                // Is set if app close button was pressed from main process
    cancelByMainAtom?: PrimitiveAtom<void>; // Cancel will be set to false when mode is turnned off by main process
};

const setWindowSize_SawMonitorAtom = atom(
    null,
    (get, set, { turnOn, canceledByMain, cancelByMainAtom }: DoSawModeOnClientAtomParams) => {
        const isOn = get(_sawModeStateAtom);

        const position = appSettings.appUi.uiGeneral.sawPosition;

        if (turnOn) {
            if (isOn) {
                return;
            }

            R2MCalls.setSawModeOnMain({ setOn: true, position });
            set(_sawModeStateAtom, true);
        } else {
            if (!isOn) {
                return;
            }

            canceledByMain && cancelByMainAtom && set(cancelByMainAtom);

            R2MCalls.setSawModeOnMain({ setOn: false, position });
            set(_sawModeStateAtom, false);
        }
    }
);

const _sawModeStateAtom = atom<boolean>(false); // Is saw mode on or off

//TODO: check what we do on cancel from main.
