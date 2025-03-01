import { atom, type Getter, type Setter } from "jotai";
import { hasMain, invokeMain } from "@/xternal-to-main";
import { GetTargetWindowResult } from "@shared/ipc-types";
import { debugSettings } from "@/store/1-atoms/9-ui-state";
import { doGetWindowIconAtom } from "../2-do-get-icon";
import { sawContentAtom, sawContentStrAtom } from "../3-do-get-controls";
import { doLoadFakeHwndAtom, type TestHwnd } from "../8-create-mani-tests-w-fetch";
import { napiBuildState } from "../9-napi-build-state";

export const sawHandleStrAtom = atom<string | undefined>('');
export const sawHandleAtom = atom<GetTargetWindowResult | null>(null);

export const doClearSawHandleAtom = atom(
    null,
    (get, set) => {
        set(sawHandleAtom, null);
        set(sawHandleStrAtom, '');
    }
);

export const doGetTargetHwndAtom = atom(
    null,
    async (get, set): Promise<void> => {
        if (napiBuildState.buildRunning) {
            return;
        }

        if (hasMain()) {
            doLiveHwnd(get, set);
        } else {
            doTestHwnd(get, set);
        }

        napiBuildState.buildRunning = false;
    }
);

async function doLiveHwnd(get: Getter, set: Setter) {
    try {
        const res = await invokeMain<string>({ type: 'r2mi:get-target-hwnd' });

        const prev = get(sawHandleStrAtom);
        if (prev === res) {
            return;
        }
        set(sawHandleStrAtom, res);

        set(sawContentStrAtom, undefined);
        set(sawContentAtom, null);

        const obj = JSON.parse(res || '{}') as GetTargetWindowResult;
        set(sawHandleAtom, obj);
        //console.log('test-offline:hwnd\n', JSON.stringify(obj, null, 4));

        if (debugSettings.uiState.iconAutoUpdate) {
            if (obj.hwnd) {
                set(doGetWindowIconAtom, obj.hwnd);
            }
        }
    } catch (error) {
        set(sawHandleStrAtom, '');
        set(sawHandleAtom, null);
        console.error(`'doGetTargetHwndAtom' ${error instanceof Error ? error.message : `${error}`}`);
    }
}

async function doTestHwnd(get: Getter, set: Setter) {
    const str = await set(doLoadFakeHwndAtom, debugSettings.testCreate.hwnd);
    set(sawHandleStrAtom, str);
    
    const testHwnd = JSON.parse(str || '{}') as TestHwnd;
    set(sawHandleAtom, testHwnd.hwnd);
}

// import { napiBuildStateAtom } from "../9-napi-build-state";
// export const sawGetDisabledAtom = atom(
//     (get) => {
//         const { buildRunning } = get(napiBuildStateAtom);
//         const secondActiveWindow = get(sawHandleAtom);
//         const hwnd = secondActiveWindow?.hwnd;
//         const isDisabled = !hwnd || buildRunning;
//         return isDisabled;
//     }
// );
