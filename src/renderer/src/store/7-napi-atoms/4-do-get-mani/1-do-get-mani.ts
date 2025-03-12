import { atom, Getter, Setter } from "jotai";
import { errorToString } from "@/utils";
import { hasMain, invokeMain } from "@/xternal-to-main";
import { type WindowControlsCollectResult } from "@shared/ipc-types";
import { napiBuildProgress, napiLock, setBuildState, splitTypedError, typedErrorToString } from "../9-napi-build-state";
import { debugSettings } from "@/store/1-atoms";
import { doLoadFakeManiAtom } from "../8-create-mani-tests-w-fetch";

export const sawManiStrAtom = atom<string | undefined>('');                 // raw unprocessed reply string from napi to compare with current
export const sawManiXmlAtom = atom<string | undefined>(undefined);          // raw xml string from napi if called with wantXml
export const sawManiAtom = atom<WindowControlsCollectResult | null>(null);  // reply with controls and pool

export const doGetWindowManiAtom = atom(
    null,
    async (get, set, params: { hwnd: string | undefined; wantXml: boolean; }): Promise<void> => {
        if (napiLock.locked()) {
            return;
        }

        if (hasMain()) {
            await doLiveMani(params, get, set);
        } else {
            await doTestMani(params, get, set);
        }

        napiLock.unlock();
    }
);

async function doLiveMani({ hwnd, wantXml }: { hwnd: string | undefined; wantXml: boolean; }, get: Getter, set: Setter) {
    try {
        if (!hwnd) {
            throw new Error('No hwnd');
        }

        // 1. call napi to get raw reply string

        setBuildState({ progress: 0, lastProgress: 0, isRunning: true, error: '', failedBody: '' });

        const res = await invokeMain<string>({ type: 'r2mi:get-window-mani', hwnd, wantXml });

        const prev = get(sawManiStrAtom);
        if (prev === res) {
            setBuildState({ progress: 0, isRunning: false, error: '' });
            return;
        }
        set(sawManiStrAtom, res);

        // 2. parse reply string to get final reply

        if (wantXml) {
            set(sawManiXmlAtom, res);

            console.log(`doGetWindowManiXmlAtom.set\n${res}`);
        } else {
            const reply = JSON.parse(res || '{}') as WindowControlsCollectResult;
            const final = reply.pool && reply.controls?.length ? reply : null;
            set(sawManiAtom, final);

            console.log('doGetWindowManiAtom.set', JSON.stringify(reply, null, 4));
        }

        setBuildState({ progress: 0, lastProgress: napiBuildProgress.buildCounter, isRunning: false, error: '' });
    } catch (error) {
        set(doClearManiAtom);
        
        const msg = errorToString(error);
        setBuildState({ progress: 0, isRunning: false, error: msg });
        console.error(`'doGetWindowManiAtom' ${typedErrorToString(splitTypedError(msg))}`);
    }
}

async function doTestMani({ hwnd, wantXml }: { hwnd: string | undefined; wantXml: boolean; }, get: Getter, set: Setter) {
    const mani = await set(doLoadFakeManiAtom, debugSettings.testCreate.mani);
    set(sawManiXmlAtom, mani);
}

const doClearManiAtom = atom(
    null,
    (get, set) => {
        set(sawManiStrAtom, '');
        set(sawManiXmlAtom, undefined);
        set(sawManiAtom, null);
    }
);
