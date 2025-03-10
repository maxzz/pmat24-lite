import { atom } from "jotai";
import { delay, randomIntExclusive } from "@/utils";
import { appSettings } from "@/store/1-atoms/9-ui-state/0-local-storage-app";
import { type GetTargetWindowResult, type WindowIconGetterResult } from "@shared/ipc-types";
import { type TestHwndEnum } from "./9-types-of-tests";
import { hashedQueryAtom } from "./8-hashed-query";
import { easyDelayInput } from "./8-easy-delay-input";
import { napiBuildProgress } from "@/store/7-napi-atoms";

export const doLoadFakeHwndAtom = atom(
    null,
    async (get, set, tsId: TestHwndEnum): Promise<string> => {

        // 1. Check if we need to delay
        const nDelay = easyDelayInput(appSettings.appUi.uiAdvanced.testCreateHwndDelay);
        if (nDelay) {
            const nDelays = nDelay / 500;
            for (let i = 0; i < nDelays; i++) {
                napiBuildProgress.buildCounter = i * 500 + randomIntExclusive(0, 100);
                await delay(500);
            }
        }

        // 2. Get content
        const fname = testHwnds[tsId];
        if (!fname) {
            return '';
        }
        
        const rv = await get(hashedQueryAtom(fname)) as string; //console.log('doLoadFakeManiAtom', fname, cnt);
        return rv;
    }
);

const testHwnds: Record<TestHwndEnum, string> = {
    none: '',
    win32: 'tests/25.02.28.25/1-hwnd-cpp.json',
    web: 'tests/25.02.28.25/2-hwnd-edge.json',
    // win32: 'tests/25.02.28.25/3-hwnd-vscode.json',
    // web: 'tests/25.02.28.25/4-hwnd-notepad.json',
}

export type TestHwnd = {
    hwnd: GetTargetWindowResult;
    icon: WindowIconGetterResult;
};
