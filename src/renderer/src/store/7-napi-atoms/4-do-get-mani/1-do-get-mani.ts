import { atom, Getter, Setter } from "jotai";
import { errorToString } from "@/utils";
import { hasMain, invokeMain } from "@/xternal-to-main";
import { debugSettings } from "@/store/1-atoms";
import { type ManifestForWindowCreatorParams, type WindowControlsCollectResult } from "@shared/ipc-types";
import { napiBuildProgress, napiLock, setBuildState } from "../9-napi-build-state";
import { doLoadFakeManiAtom } from "../8-create-mani-tests-w-fetch";

export const sawManiXmlAtom = atom<string | undefined>(undefined);   // raw unprocessed reply string from napi to compare with current
const sawManiAtom = atom<WindowControlsCollectResult | null>(null);  // reply with controls and pool

export const doGetWindowManiAtom = atom(
    null,
    async (get, set, params: ManifestForWindowCreatorParams): Promise<void> => {
        if (napiLock.locked('mani')) {
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

async function doLiveMani(params: ManifestForWindowCreatorParams, get: Getter, set: Setter) {
    try {
        if (!params.hwnd) {
            throw new Error('No hwnd');
        }

        // 1. call napi to get raw reply string

        setBuildState({ progress: 0, lastProgress: 0, isRunning: true, error: '', failedBody: '' });

        const res = await invokeMain<string>({ type: 'r2mi:get-window-mani', params });

        const prev = get(sawManiXmlAtom);
        if (prev === res) {
            setBuildState({ progress: 0, isRunning: false, error: '' });
            return;
        }
        set(sawManiXmlAtom, res);
        //printStrResultData(res);

        // 2. parse reply string to get final reply

        if (!params.wantXml) {
            const reply = JSON.parse(res || '{}') as WindowControlsCollectResult;
            const final = reply.pool && reply.controls?.length ? reply : null;
            set(sawManiAtom, final);
        }

        setBuildState({ progress: 0, lastProgress: napiBuildProgress.buildCounter, isRunning: false, error: '' });
    } catch (error) {
        set(doClearManiAtom);
        setBuildState({ progress: 0, isRunning: false, error: errorToString(error) });
    }
}

async function doTestMani(params: ManifestForWindowCreatorParams, get: Getter, set: Setter) {
    const mani = await set(doLoadFakeManiAtom, debugSettings.testCreate.mani);
    set(sawManiXmlAtom, mani);
}

const doClearManiAtom = atom(
    null,
    (get, set) => {
        set(sawManiXmlAtom, undefined);
        set(sawManiAtom, null);
    }
);

//

function printStrResultData(res: string | undefined) {
    console.log(`doGetWindowManiXmlAtom\n${res}`);
}
