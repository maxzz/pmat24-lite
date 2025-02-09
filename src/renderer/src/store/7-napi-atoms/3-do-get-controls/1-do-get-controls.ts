import { atom } from "jotai";
import { invokeMain } from "@/xternal-to-main";
import { type WindowControlsCollectFinalAfterParse } from "@shared/ipc-types";
import { type EngineControlsWithMeta } from "./9-types";
import { controlsReplyToEngineControlWithMeta } from "./2-conv-controls-meta";
import { getSubError } from "@/utils";
import { napiBuildProgress, napiBuildState } from "../9-napi-build-state";
import { setLocalState } from "./8-utils-set-state";
import { lastBuildProgressAtom } from "../1-do-get-hwnd";

export const sawContentStrAtom = atom<string | undefined>('');
export const sawContentAtom = atom<EngineControlsWithMeta | null>(null);

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

            setLocalState({ progress: 0, isRunning: true, error: '', failedBody: '' });

            const res = await invokeMain<string>({ type: 'r2mi:get-window-controls', hwnd });

            const prev = get(sawContentStrAtom);
            if (prev === res) {
                setLocalState({ progress: 0, isRunning: false, error: '' });
                return;
            }
            set(sawContentStrAtom, res);

            const reply = JSON.parse(res || '{}') as WindowControlsCollectFinalAfterParse;
            const final = controlsReplyToEngineControlWithMeta(reply);

            set(sawContentAtom, final);
            set(lastBuildProgressAtom, napiBuildProgress.buildCounter);
            setLocalState({ progress: 0, isRunning: false, error: '' });

            console.log('doGetWindowControlsAtom.set', JSON.stringify(reply, null, 4));
        } catch (error) {
            set(sawContentStrAtom, '');
            set(sawContentAtom, null);

            setLocalState({ progress: 0, isRunning: false, error: getSubError(error) });
            set(lastBuildProgressAtom, napiBuildProgress.buildCounter);

            console.error(`'doGetWindowControlsAtom' ${error instanceof Error ? error.message : `${error}`}`);
        }
    }
);
