import { atom, type Getter, type Setter } from "jotai";
import { atomWithListeners, errorToString } from "@/utils";
import { hasMain, invokeMainTyped } from "@/xternal-to-main";
import { type GetTargetWindowResult } from "@shared/ipc-types";
import { debugSettings } from "@/store/9-ui-state";
import { napiLock } from "../9-napi-build-state";
import { sawContentAtom, sawContentStrAtom } from "../3-do-get-controls";
import { doLoadFakeHwndAtom } from "../8-create-mani-tests-w-fetch";

export const sawHandleStrAtom = atom<string | undefined>('');
export const [sawHandleAtom, useSawHandleListener] = atomWithListeners<GetTargetWindowResult | null>(null);

export const doGetTargetHwndAtom = atom(
    null,
    async (get, set): Promise<void> => {
        if (!napiLock.locked('hwnd')) {

            hasMain()
                ? await doLiveHwnd(get, set)
                : await doTestHwnd(get, set);

            napiLock.unlock();
        }
    }
);

async function doLiveHwnd(get: Getter, set: Setter) {
    try {
        const res = await invokeMainTyped({ type: 'r2mi:get-target-hwnd' });

        const prev = get(sawHandleStrAtom);
        if (prev === res) {
            return;
        }
        set(sawHandleStrAtom, res);

        set(sawContentStrAtom, undefined);
        set(sawContentAtom, null);

        const obj = JSON.parse(res || '{}') as GetTargetWindowResult;
        set(sawHandleAtom, obj);
    } catch (error) {
        set(doClearSawHandleAtom);
        console.error(`'doGetTargetHwndAtom' ${errorToString(error)}`);
    }
}

async function doTestHwnd(get: Getter, set: Setter) {
    // if (lastTestCreateHwnd === debugSettings.testCreate.hwnd) {
    //     return;
    // }
    // lastTestCreateHwnd = debugSettings.testCreate.hwnd;

    const testHwnd = (await set(doLoadFakeHwndAtom, debugSettings.testCreate.hwnd));
    set(sawHandleStrAtom, JSON.stringify(testHwnd || ''));
    set(sawHandleAtom, testHwnd?.hwnd ? testHwnd.hwnd : null);
}

// let lastTestCreateHwnd: typeof debugSettings.testCreate.hwnd = 'none';

export const doClearSawHandleAtom = atom(
    null,
    (get, set) => {
        set(sawHandleStrAtom, '');
        set(sawHandleAtom, null);
    }
);
