import { atom } from "jotai";
import { type TestAppEnum } from "../0-state-debug";
import { hashedResQueryAtom } from "./8-hashed-res-query-atom";

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
        const cnt = await get(hashedResQueryAtom(fname)) as string;

        console.log('doLoadFakeManiAtom', fname, cnt);

        return cnt;
    }
);
