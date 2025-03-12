import { atom, type Getter, type Setter } from "jotai";
import { errorToString } from "@/utils";
import { hasMain, invokeMain } from "@/xternal-to-main";
import { type WindowIconGetterResult } from "@shared/ipc-types";
import { napiBuildState, napiLock, splitTypedError, typedErrorToString } from "../9-napi-build-state";
import { debugSettings } from "@/store/1-atoms";
import { type TestHwnd, doLoadFakeHwndAtom } from "../8-create-mani-tests-w-fetch";

export const sawIconStrAtom = atom<string | undefined>(undefined);
export const sawIconAtom = atom<HTMLImageElement | null>(null);
export type SawIconAtom = typeof sawIconAtom;

export const doGetWindowIconAtom = atom(
    null,
    async (get, set, hwnd: string | undefined): Promise<void> => {
        if (!hwnd) {
            set(doClearSawIconAtom);
            return;
        }

        if (!napiLock.locked()) {
            hasMain()
                ? await doLiveIcon(hwnd, get, set)
                : await doTestIcon(hwnd, get, set);
            napiLock.unlock();
        }
    }
);

async function doLiveIcon(hwnd: string, get: Getter, set: Setter) {
    try {
        const cached = iconsCache.get(hwnd);

        const str = cached ? cached : await invokeMain<string>({ type: 'r2mi:get-window-icon', hwnd });

        if (str && str !== cached) {
            iconsCache.set(hwnd, str);
        }

        const prev = get(sawIconStrAtom);
        if (prev !== str) {
            set(sawIconStrAtom, str);

            const res = JSON.parse(str || '') as WindowIconGetterResult;
            const image = new Image();
            image.src = `data:image/png;base64,${res.data}`;
            set(sawIconAtom, image);
        }

        napiBuildState.buildError = '';
    } catch (error) {
        set(doClearSawIconAtom);

        napiBuildState.buildError = errorToString(error);
        console.error(`'doGetWindowIconAtom' ${typedErrorToString(splitTypedError(napiBuildState.buildError))}`);
    }
}

const iconsCache: Map<string, string> = new Map(); // hwnd -> string with WindowIconGetterResult

export function clearIconsCache() { // Clear icons cache on monitor dialog close
    iconsCache.clear();
}

async function doTestIcon(hwnd: string, get: Getter, set: Setter) {
    // if (lastTestCreateHwnd === debugSettings.testCreate.hwnd) {
    //     return;
    // }
    // lastTestCreateHwnd = debugSettings.testCreate.hwnd;

    const testHwnd = (await set(doLoadFakeHwndAtom, debugSettings.testCreate.hwnd)) as unknown as TestHwnd;

    if (testHwnd?.icon?.data) {
        const image = new Image();
        image.src = `data:image/png;base64,${testHwnd.icon.data}`;
        set(sawIconAtom, image);
        set(sawIconStrAtom, JSON.stringify(testHwnd));
    } else {
        set(doClearSawIconAtom);
    }
}

// let lastTestCreateHwnd: typeof debugSettings.testCreate.hwnd = 'none';

const doClearSawIconAtom = atom(
    null,
    (get, set) => {
        set(sawIconStrAtom, '');
        set(sawIconAtom, null);
    }
);
