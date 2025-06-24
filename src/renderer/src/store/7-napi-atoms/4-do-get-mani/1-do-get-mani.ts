import { atom, type Getter, type Setter } from "jotai";
import { errorToString } from "@/utils";
import { hasMain, invokeMainTyped } from "@/xternal-to-main";
import { debugSettings } from "@/store/9-ui-state";
import { type ManifestForWindowCreatorParams } from "@shared/ipc-types";
import { stateNapiBuildMani, napiLock, setBuildState } from "../9-napi-build-state";
import { doLoadFakeManiAtom } from "../8-create-mani-tests-w-fetch";

export const maniXmlStrAtom = atom<string | undefined>(undefined);   // raw unprocessed reply string from napi to compare with current

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

        const res = await invokeMainTyped({ type: 'r2mi:get-window-mani', params });

        const prev = get(maniXmlStrAtom);
        if (prev === res) {
            setBuildState({ progress: 0, isRunning: false, error: '' });
            return;
        }
        set(maniXmlStrAtom, res); //printStrResultData(res);

        setBuildState({ progress: 0, lastProgress: stateNapiBuildMani.buildCounter, isRunning: false, error: '' });
    } catch (error) {
        set(maniXmlStrAtom, undefined);
        setBuildState({ progress: 0, isRunning: false, error: errorToString(error) });
    }
}

async function doTestMani(params: ManifestForWindowCreatorParams, get: Getter, set: Setter) {
    const mani = await set(doLoadFakeManiAtom, debugSettings.testCreate.mani);
    set(maniXmlStrAtom, mani);
}

//

function printStrResultData(res: string | undefined) {
    console.log(`doGetWindowManiXmlAtom\n${res}`);
}
