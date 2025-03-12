import { atom } from "jotai";
import { delay, randomIntExclusive } from "@/utils";
import { appSettings } from "@/store/1-atoms/9-ui-state/0-local-storage-app";
import { type TestManiEnum } from "./9-types-of-tests";
import { hashedQueryAtom } from "./8-hashed-query";
import { easyDelayInput } from "./8-easy-delay-input";
import { makeTypedError, napiBuildProgress, napiLock, setBuildState } from "@/store/7-napi-atoms";

export const doLoadFakeManiAtom = atom(
    null,
    async (get, set, tsId: TestManiEnum): Promise<string> => {
        const fname = testManis[tsId];
        if (!fname) {
            return '';
        }

        setBuildState({ progress: 0, lastProgress: 0, isRunning: true, error: '', failedBody: '' });
        
        // 1. Check if we need to delay
        const nDelay = easyDelayInput(appSettings.appUi.uiAdvanced.testCreateManiDelay);
        if (nDelay) {
            const nDelays = nDelay / 500;
            for (let i = 0; i < nDelays; i++) {
                if (napiLock.canceled) {
                    setBuildState({ progress: 0, lastProgress: napiBuildProgress.buildCounter, isRunning: false, error: makeTypedError('canceled-by-user') });
                    return '';
                }
                napiBuildProgress.buildCounter = i * 500 + randomIntExclusive(0, 100);
                await delay(500);
            }
        }

        // 2. Get content
        const rv = await get(hashedQueryAtom(fname)) as string; //console.log('doLoadFakeManiAtom', fname, cnt);

        setBuildState({ progress: 0, lastProgress: napiBuildProgress.buildCounter, isRunning: false, error: '' });

        return rv;
    }
);

const testManis: Record<TestManiEnum, string> = {
    none: '',
    win32: 'tests/{1d88e2f5-70b7-4c9f-bda4-b72afd02005d}.dpm',
    web: 'tests/{1fdf1f83-a96f-422c-981e-3ca4e6cedd20}.dpm',
}
