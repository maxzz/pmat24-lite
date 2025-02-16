import { atom } from "jotai";
import { type TestScreenEnum } from "../0-state-debug";
import { type TlwScreenshot } from "@shared/ipc-types";
import { hashedQueryAtom } from "./8-hashed-query";
import { appSettings } from "../0-all";
import { delay } from "@/utils";

const testScreenIds: Record<TestScreenEnum, string> = {
    none: '',
    A: 'tests/25.01.16.25/TopLevelWindowsScreenshots.json',
    B: 'tests/25.01.16.25/TopLevelWindowsScreenshots2many.json',
};

export const doLoadFakeScreensAtom = atom(
    null,
    async (get, set, tsId: TestScreenEnum) => {
        // 1. Check if we need to delay
        const d = appSettings.appUi.uiAdvanced.testCreateAppsDelay;
        const hasDelay = d > 0 && d < 10000;
        if (hasDelay) {
            await delay(d);
        }

        // 2. Get content
        const fname = testScreenIds[tsId];
        if (!fname) {
            return [];
        }

        const cnt = await get(hashedQueryAtom(fname)) as TlwScreenshot[]; //console.log('doLoadFakeScreenshotsAtom', fname, cnt);
        return cnt;
    }
);
