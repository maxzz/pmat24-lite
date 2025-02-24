import { atom } from "jotai";
import { doOpenCreateManiSawAtom } from "@/store";
import { hasMain, sendToMain } from "@/xternal-to-main";

const _SawModeAtom = atom<boolean>(false);

export const sawModeAtom = atom(
    get => get(_SawModeAtom),
    (get, set, { setOn, canceledByMain }: { setOn: boolean; canceledByMain: boolean; }) => { // canceledByMain is set if app close button was pressed
        const isOn = get(_SawModeAtom);

        // turn on
        if (setOn) {
            if (isOn) {
                return;
            }

            if (!hasMain()) {
                return;
            }
            sendToMain({ type: 'r2m:set-saw-mode', isOn: true });
            set(_SawModeAtom, true);
            return;
        }

        // turn off
        if (canceledByMain) {
            set(doOpenCreateManiSawAtom, false);
        }
        set(_SawModeAtom, false);
    }
);
