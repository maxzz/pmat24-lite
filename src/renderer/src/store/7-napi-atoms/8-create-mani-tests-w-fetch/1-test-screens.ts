import { atom } from "jotai";
import { delay, randomIntExclusive } from "@/utils";
import { appSettings } from "@/store/9-ui-state";
import { stateNapiBuildMani } from "@/store/7-napi-atoms";
import { type TlwScreenshot } from "@shared/ipc-types";
import { type TestScreenEnum } from "./9-types-of-tests";
import { hashedQueryAtom } from "./8-hashed-query";
import { easyDelayInput } from "./8-easy-delay-input";

export const doLoadFakeScreensAtom = atom(
    null,
    async (get, set, tsId: TestScreenEnum): Promise<TlwScreenshot[]> => {

        // 1. Check if we need to delay
        const nDelay = easyDelayInput(appSettings.appUi.uiAdvanced.testCreateAppsDelay);
        if (nDelay) {
            const nDelays = nDelay / 500;
            for (let i = 0; i < nDelays; i++) {
                stateNapiBuildMani.buildCounter = i * 500 + randomIntExclusive(0, 100);
                await delay(500);
            }
        }

        // 2. Get content
        const fname = testScreenIds[tsId];
        if (!fname) {
            return [];
        }

        const rv = await get(hashedQueryAtom(fname)) as TlwScreenshot[]; //console.log('doLoadFakeScreenshotsAtom', fname, cnt);
        return rv;
    }
);

const testScreenIds: Record<TestScreenEnum, string> = {
    none: '',
    A: 'tests/25.01.16.25/TopLevelWindowsScreenshots.json',
    B: 'tests/25.01.16.25/TopLevelWindowsScreenshots2many.json',
};
