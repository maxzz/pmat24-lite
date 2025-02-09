import { atom } from "jotai";
import { invokeMain } from "@/xternal-to-main";
import { type WindowControlsCollectFinal } from "@shared/ipc-types";
import { napiBuildProgress, napiBuildState } from "../9-napi-build-state";
import { setLocalState } from "../3-do-get-controls";
import { lastBuildProgressAtom } from "../1-do-get-hwnd";
import { getSubError } from "@/utils";

export const sawManiStrAtom = atom<string | undefined>('');         // raw unprocessed reply string from napi to compare with current
export const sawManiXmlAtom = atom<string | undefined>(undefined);  // raw xml string from napi if called with wantXml
export const sawManiAtom = atom<WindowControlsCollectFinal | null>(null); // reply with controls and pool

export const doGetWindowManiAtom = atom(
    null,
    async (get, set, { hwnd, wantXml }: { hwnd: string | undefined; wantXml: boolean; }): Promise<void> => {
        try {
            if (!hwnd) {
                throw new Error('No hwnd');
            }

            if (napiBuildState.buildRunning) {
                return;
            }

            // 1. call napi to get raw reply string

            setLocalState({ progress: 0, isRunning: true, error: '', failedBody: '' });

            const res = await invokeMain<string>({ type: 'r2mi:get-window-mani', hwnd, wantXml });

            const prev = get(sawManiStrAtom);
            if (prev === res) {
                setLocalState({ progress: 0, isRunning: false, error: '' });
                return;
            }
            set(sawManiStrAtom, res);

            // 2. parse reply string to get final reply

            if (wantXml) {
                set(sawManiXmlAtom, res);

                console.log(`doGetWindowManiXmlAtom.set\n${res}`);
            } else {
                const reply = JSON.parse(res || '{}') as WindowControlsCollectFinal;
                const final = reply.pool && reply.controls?.length ? reply : null;
                set(sawManiAtom, final);

                console.log('doGetWindowManiAtom.set', JSON.stringify(reply, null, 4));
            }

            set(lastBuildProgressAtom, napiBuildProgress.buildCounter);
            setLocalState({ progress: 0, isRunning: false, error: '' });
        } catch (error) {
            set(sawManiStrAtom, '');
            set(sawManiAtom, null);
            setLocalState({ progress: 0, isRunning: false, error: getSubError(error) });

            console.error(`'doGetWindowManiAtom' ${error instanceof Error ? error.message : `${error}`}`);
        }
    }
);
