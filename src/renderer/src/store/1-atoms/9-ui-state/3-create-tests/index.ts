import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { prependUrlPath } from "@/utils";
import { TestAppEnum, type TestScreenEnum } from "../0-state-debug";

const hashedResQueryAtom = atomFamily(
    (fname: string) => atom(
        async () => {
            try {
                if (!fname) {
                    return '';
                }

                const isIdJson = fname.endsWith('.json');
                const url = prependUrlPath(fname);
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error(`Failed to fetch ${url}`);
                }

                const rv = isIdJson ? await res.json() : await res.text();
                return rv;
            } catch (error) {
                console.error(error);
                return '';
            }
        }
    )
);

const testScreenIds: Record<TestScreenEnum, string> = {
    none: '',
    A: 'tests/25.01.16.25/TopLevelWindowsScreenshots.json',
    B: 'tests/25.01.16.25/TopLevelWindowsScreenshots2many.json',
};

export const doLoadFakeScreenshotsAtom = atom(
    null,
    async (get, set, tsId: TestScreenEnum) => {
        if (tsId === 'none') {
            return '';
        }

        const fname = testScreenIds[tsId];
        const cnt = await get(hashedResQueryAtom(fname));

        console.log('doLoadFakeScreenshotsAtom', fname, cnt);

        return cnt;
    }
);

const testManis: Record<TestAppEnum, string> = {
    none: '',
    win32: 'tests/{1d88e2f5-70b7-4c9f-bda4-b72afd02005d}.dpm',
    web: 'tests/{1fdf1f83-a96f-422c-981e-3ca4e6cedd20}.dpm',
}

export const doLoadFakeManiAtom = atom(
    null,
    async (get, set, tsId: TestAppEnum) => {
        if (tsId === 'none') {
            return '';
        }

        const fname = testManis[tsId];
        const cnt = await get(hashedResQueryAtom(fname));

        console.log('doLoadFakeManiAtom', fname, cnt);

        return cnt;
    }
);
