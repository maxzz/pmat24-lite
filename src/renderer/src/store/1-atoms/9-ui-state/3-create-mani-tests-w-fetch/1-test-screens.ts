import { atom } from "jotai";
import { appSettings } from "../0-all";
import { delay, randomIntExclusive } from "@/utils";
import { type TestScreenEnum } from "../0-state-debug";
import { type TlwScreenshot } from "@shared/ipc-types";
import { hashedQueryAtom } from "./8-hashed-query";
import { easyDelayInput } from "./3-easy-delay-input";
import { napiBuildProgress } from "@/store/7-napi-atoms";

const testScreenIds: Record<TestScreenEnum, string> = {
    none: '',
    A: 'tests/25.01.16.25/TopLevelWindowsScreenshots.json',
    B: 'tests/25.01.16.25/TopLevelWindowsScreenshots2many.json',
};

export const doLoadFakeScreensAtom = atom(
    null,
    async (get, set, tsId: TestScreenEnum) => {
        // 1. Check if we need to delay
        const nDelay = easyDelayInput(appSettings.appUi.uiAdvanced.testCreateAppsDelay);
        if (nDelay) {
            const nDelays = nDelay / 500;
            for (let i = 0; i < nDelays; i++) {
                napiBuildProgress.buildCounter = i * 500 + randomIntExclusive(0, 100);
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
