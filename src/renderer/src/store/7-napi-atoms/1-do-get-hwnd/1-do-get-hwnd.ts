import { atom, type Getter, type Setter } from "jotai";
import { hasMain, invokeMain } from "@/xternal-to-main";
import { GetTargetWindowResult } from "@shared/ipc-types";
import { debugSettings } from "@/store/1-atoms/9-ui-state";
import { isNapiLocked, napiBuildState, nonReactiveLock } from "../9-napi-build-state";
import { doGetWindowIconAtom } from "../2-do-get-icon";
import { sawContentAtom, sawContentStrAtom } from "../3-do-get-controls";
import { doLoadFakeHwndAtom, type TestHwnd } from "../8-create-mani-tests-w-fetch";

export const sawHandleStrAtom = atom<string | undefined>('');
export const sawHandleAtom = atom<GetTargetWindowResult | null>(null);

export const sawHandleCaptionAtom = atom(
    (get) => {
        let rv = get(sawHandleAtom)?.caption || ''; //'Login - Tailwind UI and 2 more pages - Personal - Microsoft​ Edge'
        rv = rv.replace(/ - Google Chrome$/g, '');
        rv = rv.replace(/ - Microsoft.? Edge$/g, ''); // it has some hidden unicode symbol 'E2 80 8B' ("ZERO-WIDTH SPACE" character) afer 't' : " - Microsoft​ Edge'"
        rv = rv.replace(/ - Personal$/g, '');
        // return rv.length > 30 ? `${rv.substring(0, 30)}...` : rv;
        return rv;
    }
);

/**
 * Shorten caption by removing browser name and flavor like:
 * "Login - Tailwind UI and 2 more pages - Personal - Microsoft​ Edge"
 * to 'Login - Tailwind UI and 2 more pages'
 * Note on Microsoft Edge: There is hidden unicode character 'E2 80 8B' ("ZERO-WIDTH SPACE") afer 't' : " - Microsoft​ Edge'"
 * @param caption 
 * @returns 
 */
function shortenCaption(caption: string | undefined) {
    let rv = caption || '';
    if (!rv) {
        return rv;
    }
    rv = rv.replace(/ - Google Chrome$/g, '');
    rv = rv.replace(/ - Microsoft.? Edge$/g, '');
    rv = rv.replace(/ - Personal$/g, '');
    // rv = rv.length > 30 ? `${rv.substring(0, 30)}...` : rv;
    return rv;
}

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

        if (isNapiLocked()) {
            return;
        }

        if (hasMain()) {
            doLiveHwnd(get, set);
        } else {
            doTestHwnd(get, set);
        }

        nonReactiveLock.locked = false;
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
    if (lastTestCreateHwnd === debugSettings.testCreate.hwnd) {
        return;
    }
    lastTestCreateHwnd = debugSettings.testCreate.hwnd;

    const testHwnd = (await set(doLoadFakeHwndAtom, debugSettings.testCreate.hwnd)) as unknown as TestHwnd;
    set(sawHandleStrAtom, JSON.stringify(testHwnd));
    set(sawHandleAtom, testHwnd?.hwnd ? testHwnd.hwnd : null);
}

let lastTestCreateHwnd: typeof debugSettings.testCreate.hwnd = 'none';

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
