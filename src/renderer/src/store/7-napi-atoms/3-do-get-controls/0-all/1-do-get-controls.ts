import { atom } from "jotai";
import { invokeMain } from "@/xternal-to-main";
import { type WindowControlsCollectFinalAfterParse } from "@shared/ipc-types";
import { type EngineControlsWithMeta } from "../9-types";
import { controlsReplyToEngineControlWithMeta } from "./2-conv-controls-meta";
import { getSubError } from "@/utils";
import { lastBuildProgressAtom } from "../../1-do-get-hwnd";
import { napiBuildProgress, napiBuildState } from "../../9-napi-build-state";

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

            napiBuildState.buildRunning = true;
            napiBuildProgress.buildCounter = 0;
            napiBuildState.buildError = '';
            napiBuildState.buildFailedBody = '';

            const res = await invokeMain<string>({ type: 'r2mi:get-window-controls', hwnd });

            const prev = get(sawContentStrAtom);
            if (prev === res) {
                napiBuildState.buildRunning = false;
                napiBuildProgress.buildCounter = 0;
                napiBuildState.buildError = '';
                return;
            }
            set(sawContentStrAtom, res);

            const reply = JSON.parse(res || '{}') as WindowControlsCollectFinalAfterParse;
            const final = controlsReplyToEngineControlWithMeta(reply);

            set(sawContentAtom, final);

            set(lastBuildProgressAtom, napiBuildProgress.buildCounter);
            napiBuildState.buildRunning = false;
            napiBuildProgress.buildCounter = 0;
            napiBuildState.buildError = '';

            console.log('doGetWindowControlsAtom.set', JSON.stringify(reply, null, 4));
        } catch (error) {
            set(sawContentStrAtom, '');
            set(sawContentAtom, null);

            napiBuildState.buildRunning = false;
            napiBuildProgress.buildCounter = 0;
            napiBuildState.buildError = getSubError(error);

            set(lastBuildProgressAtom, napiBuildProgress.buildCounter);

            console.error(`'doGetWindowControlsAtom' ${error instanceof Error ? error.message : `${error}`}`);
        }
    }
);
