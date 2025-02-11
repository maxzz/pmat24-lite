import { atom } from "jotai";
import { type TestScreenEnum } from "../0-state-debug";
import { hashedQueryAtom } from "./8-hashed-query";
import { TlwScreenshot } from "@shared/ipc-types";

const testScreenIds: Record<TestScreenEnum, string> = {
    none: '',
    A: 'tests/25.01.16.25/TopLevelWindowsScreenshots.json',
    B: 'tests/25.01.16.25/TopLevelWindowsScreenshots2many.json',
};

export const doLoadFakeScreensAtom = atom(
    null,
    async (get, set, tsId: TestScreenEnum) => {
        const fname = testScreenIds[tsId];
        if (!fname) {
            return [];
        }

        const cnt = await get(hashedQueryAtom(fname)) as TlwScreenshot[]; //console.log('doLoadFakeScreenshotsAtom', fname, cnt);
        return cnt;
    }
);
