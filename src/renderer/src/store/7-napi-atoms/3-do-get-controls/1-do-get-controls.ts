import { atom } from "jotai";
import { invokeMain } from "@/xternal-to-main";
import { type WindowControlsCollectFinalAfterParse } from "@shared/ipc-types";
import { type EngineControlsWithMeta } from "./9-types";
import { controlsReplyToEngineControlWithMeta } from "./2-conv-controls-meta";
import { errorFromSubstring, errorToString, splitTypedError, typedErrorToString } from "@/utils";
import { napiBuildProgress, napiBuildState, setBuildState } from "../9-napi-build-state";

export const sawContentStrAtom = atom<string | undefined>('');                  // raw unprocessed reply string from napi to compare with current
export const sawContentAtom = atom<EngineControlsWithMeta | null>(null);        // reply with controls and pool

export const doGetWindowControlsAtom = atom(
    null,
    async (get, set, hwnd: string | undefined): Promise<void> => {
        try {
            if (!hwnd) {
                throw new Error('No hwnd');
            }

            if (napiBuildState.buildRunning) {
                return;
            }

            // 1. call napi to get raw reply string

            setBuildState({ progress: 0, lastProgress: 0, isRunning: true, error: undefined, failedBody: '' });

            const res = await invokeMain<string>({ type: 'r2mi:get-window-controls', hwnd });

            const prev = get(sawContentStrAtom);
            if (prev === res) {
                setBuildState({ progress: 0, isRunning: false, error: undefined });
                return;
            }
            set(sawContentStrAtom, res);

            // 2. parse reply string to get final reply

            const poolAndControls = JSON.parse(res || '{}') as WindowControlsCollectFinalAfterParse;
            const final = controlsReplyToEngineControlWithMeta(poolAndControls);

            set(sawContentAtom, final);
            setBuildState({ progress: 0, lastProgress: napiBuildProgress.buildCounter, isRunning: false, error: undefined });

            console.log('doGetWindowControlsAtom', JSON.stringify(poolAndControls, null, 4));
        } catch (error) {
            set(sawContentStrAtom, '');
            set(sawContentAtom, null);

            const typedError = splitTypedError(errorToString(error));
            setBuildState({ progress: 0, lastProgress: napiBuildProgress.buildCounter, isRunning: false, error: typedError });

            console.error(`'doGetWindowControlsAtom' ${typedErrorToString(typedError)}`);

        }
    }
);
