import { atom, type Getter, type Setter } from "jotai";
import { shortenWindowCaption } from "@/utils";
import { hasMain, invokeMain } from "@/xternal-to-main";
import { GetTargetWindowResult } from "@shared/ipc-types";
import { debugSettings } from "@/store/1-atoms/9-ui-state";
import { isNapiLocked, nonReactiveLock } from "../9-napi-build-state";
import { doGetWindowIconAtom } from "../2-do-get-icon";
import { sawContentAtom, sawContentStrAtom } from "../3-do-get-controls";
import { doLoadFakeHwndAtom, type TestHwnd } from "../8-create-mani-tests-w-fetch";

export const sawHandleStrAtom = atom<string | undefined>('');
export const sawHandleAtom = atom<GetTargetWindowResult | null>(null);

export const sawHandleCaptionAtom = atom(
    (get) => {
        if (hasMain() || !debugSettings.testCreate.dummyCaption) {
            return shortenWindowCaption(get(sawHandleAtom)?.caption);
        }

        let rv = get(sawHandleAtom)?.caption;
        if (debugSettings.testCreate.hwnd === 'none') {
            rv = '';
        }
        else if (debugSettings.testCreate.hwnd === 'win32') {
            rv = 'long name C:\\Y\\w\\2-web\\0-dp\\pmat24-lite\\src\\renderer\\src\\store\\7-napi-atoms\\1-do-get-hwnd';
            // rv = 'C:\\Users\\maxzz\\Desktop\\HID bugs\\89863\\temp-for-max\\DigitalPersona Templates Edge\\C\\copies-from-here';
        } else {
            rv = 'short name';
        }
        return rv;
    }
);

export const doClearSawHandleAtom = atom(
    null,
    (get, set) => {
        set(sawHandleStrAtom, '');
        set(sawHandleAtom, null);
    }
);

export const doGetTargetHwndAtom = atom(
    null,
    async (get, set): Promise<void> => {
        if (!isNapiLocked()) {
            hasMain() ? doLiveHwnd(get, set) : doTestHwnd(get, set);
            nonReactiveLock.locked = false;
        }
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
