import { atom } from "jotai";
import { buildState, clientState } from "../../app-state";
import { invokeMain } from "../../../xternal-to-main";
import { getSubError } from "@/utils";
import { WindowControlsCollectFinalAfterParse } from "@shared/ipc-types";
import { lastBuildProgressAtom } from "..";
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

            if (clientState.buildRunning) {
                return;
            }

            clientState.buildRunning = true;
            buildState.buildCounter = 0;
            clientState.buildError = '';
            clientState.buildFailedBody = '';

            const res = await invokeMain<string>({ type: 'r2mi:get-window-controls', hwnd });

            const prev = get(sawContentStrAtom);
            if (prev === res) {
                clientState.buildRunning = false;
                buildState.buildCounter = 0;
                clientState.buildError = '';
                return;
            }
            set(sawContentStrAtom, res);

            const reply = JSON.parse(res || '{}') as WindowControlsCollectFinalAfterParse;
            const final = controlsReplyToEngineControlWithMeta(reply);

            set(sawContentAtom, final);

            set(lastBuildProgressAtom, buildState.buildCounter);
            clientState.buildRunning = false;
            buildState.buildCounter = 0;
            clientState.buildError = '';

            console.log('doGetWindowControlsAtom.set', JSON.stringify(reply, null, 4));
        } catch (error) {
            set(sawContentStrAtom, '');
            set(sawContentAtom, null);

            clientState.buildRunning = false;
            buildState.buildCounter = 0;
            clientState.buildError = getSubError(error);

            set(lastBuildProgressAtom, buildState.buildCounter);

            console.error(`'doGetWindowControlsAtom' ${error instanceof Error ? error.message : `${error}`}`);
        }
    }
);
