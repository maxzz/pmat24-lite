import { atom } from "jotai";
import { type TestManiEnum } from "../0-state-debug";
import { hashedQueryAtom } from "./8-hashed-query";

const testManis: Record<TestManiEnum, string> = {
    none: '',
    win32: 'tests/{1d88e2f5-70b7-4c9f-bda4-b72afd02005d}.dpm',
    web: 'tests/{1fdf1f83-a96f-422c-981e-3ca4e6cedd20}.dpm',
}

export const doLoadFakeManiAtom = atom(
    null,
    async (get, set, tsId: TestManiEnum) => {
        const fname = testManis[tsId];
        if (!fname) {
            return '';
        }
        
        const cnt = await get(hashedQueryAtom(fname)) as string; //console.log('doLoadFakeManiAtom', fname, cnt);
        return cnt;
    }
);
