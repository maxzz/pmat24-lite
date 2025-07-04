import { atom } from "jotai";
import { delay, randomIntExclusive } from "@/utils";
import { appSettings } from "@/store/9-ui-state";
import { stateNapiBuildMani } from "@/store/7-napi-atoms";
import { type GetTargetWindowResult, type WindowIconGetterResult } from "@shared/ipc-types";
import { type TestHwndEnum } from "./9-types-of-tests";
import { hashedQueryAtom } from "./8-hashed-query";
import { easyDelayInput } from "./8-easy-delay-input";

export const doLoadFakeHwndAtom = atom(
    null,
    async (get, set, tsId: TestHwndEnum): Promise<TestHwnd | undefined> => {

        // 1. Check if we need to delay
        const nDelay = easyDelayInput(appSettings.appUi.uiAdvanced.testCreateHwndDelay);
        if (nDelay) {
            const nDelays = nDelay / 500;
            for (let i = 0; i < nDelays; i++) {
                stateNapiBuildMani.buildCounter = i * 500 + randomIntExclusive(0, 100);
                await delay(500);
            }
        }

        // 2. Get content
        const fname = testHwnds[tsId];
        if (!fname) {
            return;
        }
        
        const rv = await get(hashedQueryAtom(fname)) as TestHwnd; //console.log('doLoadFakeManiAtom', fname, cnt);
        return rv;
    }
);

export type TestHwnd = {
    hwnd: GetTargetWindowResult;
    icon: WindowIconGetterResult;
};

const testHwnds: Record<TestHwndEnum, string> = { // This is relative to the public/tests folder
    none: '',
    win32: 'tests/1-hwnds/1-hwnd-cpp-clogin22.json',
    web: 'tests/1-hwnds/2-hwnd-edge.json',
    // win32: 'tests/1-hwnds/3-hwnd-vscode.json',
    // web: 'tests/1-hwnds/4-hwnd-notepad.json',
}
