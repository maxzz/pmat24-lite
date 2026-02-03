import { atom } from "jotai";
import { errorToString } from "@/utils";
import { invokeMainTyped } from "@/xternal-to-main";
import { type WindowControlsCollectFinalAfterParse } from "@shared/ipc-types";
import { type EngineControlsWithMeta } from "./9-types";
import { controlsReplyToEngineControlWithMeta } from "./2-conv-controls-meta";
import { stateNapiBuildMani, stateNapiAccess, setBuildState } from "../9-napi-build-state";

export const sawContentStrAtom = atom<string | undefined>('');                  // raw unprocessed reply string from napi to compare with current
export const sawContentAtom = atom<EngineControlsWithMeta | null>(null);        // reply with controls and pool

export const doGetWindowControlsAtom = atom(
    null,
    async (get, set, hwnd: string | undefined): Promise<void> => {
        try {
            if (!hwnd) {
                throw new Error('No hwnd');
            }

            if (stateNapiAccess.buildRunning) {
                return;
            }

            // 1. call napi to get raw reply string

            setBuildState({ progress: 0, lastProgress: 0, isRunning: true, error: '', failedBody: '' });

            const res = await invokeMainTyped({ type: 'r2mi:get-window-controls', hwnd });

            const prev = get(sawContentStrAtom);
            if (prev === res) {
                setBuildState({ progress: 0, isRunning: false, error: '' });
                return;
            }
            set(sawContentStrAtom, res);

            // 2. parse reply string to get final reply

            const poolAndControls = JSON.parse(res || '{}') as WindowControlsCollectFinalAfterParse;
            const final = controlsReplyToEngineControlWithMeta(poolAndControls);

            set(sawContentAtom, final);
            setBuildState({ progress: 0, lastProgress: stateNapiBuildMani.buildCounter, isRunning: false, error: '' });

            print_ControlsData(poolAndControls);
        } catch (error) {
            set(doClearWindowControlsAtom);
            setBuildState({ progress: 0, lastProgress: stateNapiBuildMani.buildCounter, isRunning: false, error: errorToString(error) });
        }
    }
);

const doClearWindowControlsAtom = atom(
    null,
    (get, set) => {
        set(sawContentStrAtom, '');
        set(sawContentAtom, null);
    }
);

/**
 * Print hwnd and icon in format that can be used in tests.
 */
function print_ControlsData(poolAndControls: WindowControlsCollectFinalAfterParse) {
    console.log('doGetWindowControlsAtom', JSON.stringify(poolAndControls, null, 4));
}
