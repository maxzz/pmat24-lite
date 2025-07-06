import { atom } from "jotai";
import { delay, randomIntExclusive } from "@/utils";
import { appSettings, debugSettings } from "@/store/9-ui-state";
import { makeTypedError, stateNapiBuildMani, napiLock, setBuildState } from "@/store/7-napi-atoms";
import { type TestManiEnum } from "./9-types-of-tests";
import { hashedQueryAtom } from "./8-hashed-query";
import { easyDelayInput } from "./8-easy-delay-input";

export const doLoadFakeManiAtom = atom(
    null,
    async (get, set, tsId: TestManiEnum): Promise<string> => {
        const { doCpass } = debugSettings.testCreate;

        const fname = doCpass ? testCpassFormManis[tsId] : testLoginFormManis[tsId];
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
                    setBuildState({ progress: 0, lastProgress: stateNapiBuildMani.buildCounter, isRunning: false, error: makeTypedError({ error: 'canceled-by-user' }) });
                    return '';
                }
                stateNapiBuildMani.buildCounter = i * 500 + randomIntExclusive(0, 100);
                await delay(500);
            }
        }

        // 2. Get content
        const rv = await get(hashedQueryAtom(fname)) as string; //console.log('doLoadFakeManiAtom', fname, cnt);

        setBuildState({ progress: 0, lastProgress: stateNapiBuildMani.buildCounter, isRunning: false, error: '' });

        return rv;
    }
);

const testLoginFormManis: Record<TestManiEnum, string> = { // This is relative to the public/tests folder
    none: '',
    // win32: 'tests/2-manis/{1d88e2f5-70b7-4c9f-bda4-b72afd02005d}-manual-web.dpm',
    win32: 'tests/2-manis/{cf3e9911-52f0-46fe-a100-df1a27a5148c}-manual-w32-cpass.dpm',
    web: 'tests/2-manis/{1fdf1f83-a96f-422c-981e-3ca4e6cedd20}-normal-web-cpass.dpm',
};

const testCpassFormManis: Record<TestManiEnum, string> = { // This is relative to the public/tests folder
    none: '',
    // win32: 'tests/2-manis/{1d88e2f5-70b7-4c9f-bda4-b72afd02005d}-manual-web.dpm',
    win32: 'tests/2-manis/{cf3e9911-52f0-46fe-a100-df1a27a5148c}-manual-w32-cpass.dpm',
    web: 'tests/2-manis/{1fdf1f83-a96f-422c-981e-3ca4e6cedd20}-normal-web-cpass.dpm',
};
