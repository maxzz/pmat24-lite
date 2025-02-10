import { atom } from "jotai";
import { type TestScreenEnum } from "../0-state-debug";
import { hashedResQueryAtom } from "./8-hashed-res-query-atom";
import { TlwScreenshot } from "@shared/ipc-types";

const testScreenIds: Record<TestScreenEnum, string> = {
    none: '',
    A: 'tests/25.01.16.25/TopLevelWindowsScreenshots.json',
    B: 'tests/25.01.16.25/TopLevelWindowsScreenshots2many.json',
};

export const doLoadFakeScreenshotsAtom = atom(
    null,
    async (get, set, tsId: TestScreenEnum) => {
        if (tsId === 'none') {
            return [];
        }

        const fname = testScreenIds[tsId];
        const cnt = await get(hashedResQueryAtom(fname)) as TlwScreenshot[];

        console.log('doLoadFakeScreenshotsAtom', fname, cnt);

        return cnt;
    }
);
