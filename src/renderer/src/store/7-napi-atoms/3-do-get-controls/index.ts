import { atom } from "jotai";
import { buildProgressState, maniBuildState } from "@/store/state-debug";
import { invokeMain } from "@/xternal-to-main";
import { getSubError } from "@/utils";
import { WindowControlsCollectFinalAfterParse } from "@shared/ipc-types";
import { lastBuildProgressAtom } from "../1-do-get-hwnd";
import { EngineControlsWithMeta, controlsReplyToEngineControlWithMeta } from "./controls-meta";

export const sawContentStrAtom = atom<string | undefined>('');
export const sawContentAtom = atom<EngineControlsWithMeta | null>(null);

export const doGetWindowControlsAtom = atom(
    null,
    async (get, set, hwnd: string | undefined): Promise<void> => {
        try {
            if (!hwnd) {
                throw new Error('No hwnd');
            }

            if (maniBuildState.buildRunning) {
                return;
            }

            maniBuildState.buildRunning = true;
            buildProgressState.buildCounter = 0;
            maniBuildState.buildError = '';
            maniBuildState.buildFailedBody = '';

            const res = await invokeMain<string>({ type: 'r2mi:get-window-controls', hwnd });

            const prev = get(sawContentStrAtom);
            if (prev === res) {
                maniBuildState.buildRunning = false;
                buildProgressState.buildCounter = 0;
                maniBuildState.buildError = '';
                return;
            }
            set(sawContentStrAtom, res);

            const reply = JSON.parse(res || '{}') as WindowControlsCollectFinalAfterParse;
            const final = controlsReplyToEngineControlWithMeta(reply);

            set(sawContentAtom, final);

            set(lastBuildProgressAtom, buildProgressState.buildCounter);
            maniBuildState.buildRunning = false;
            buildProgressState.buildCounter = 0;
            maniBuildState.buildError = '';

            console.log('doGetWindowControlsAtom.set', JSON.stringify(reply, null, 4));
        } catch (error) {
            set(sawContentStrAtom, '');
            set(sawContentAtom, null);

            maniBuildState.buildRunning = false;
            buildProgressState.buildCounter = 0;
            maniBuildState.buildError = getSubError(error);

            set(lastBuildProgressAtom, buildProgressState.buildCounter);

            console.error(`'doGetWindowControlsAtom' ${error instanceof Error ? error.message : `${error}`}`);
        }
    }
);
