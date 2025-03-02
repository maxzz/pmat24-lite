import { atom, type Getter, type Setter } from "jotai";
import { hasMain, invokeMain } from "@/xternal-to-main";
import { WindowIconGetterResult } from "@shared/ipc-types";
import { napiBuildState, nonReactiveLock } from "../9-napi-build-state";
import { getSubError } from "@/utils";
import { doLoadFakeHwndAtom, type TestHwnd } from "../8-create-mani-tests-w-fetch";
import { debugSettings } from "@/store/1-atoms";
//import { sawHandleAtom } from "./do-get-hwnd";

export const sawIconStrAtom = atom<string | undefined>(undefined);
export const sawIconAtom = atom<HTMLImageElement | null>(null);
export type SawIconAtom = typeof sawIconAtom;

type IconsCache = Map<string, string>; // hwnd -> string with WindowIconGetterResult

const iconsCache: IconsCache = new Map();

export const doGetWindowIconAtom = atom(
    null,
    async (get, set, hwnd: string | undefined): Promise<void> => {
        if (nonReactiveLock.locked) {
            return;
        }
        nonReactiveLock.locked = true;
        
        if (hasMain()) {
            doLiveIcon(hwnd, get, set);
        } else {
            doTestIcon(hwnd, get, set);
        }

        nonReactiveLock.locked = false;
    }
);

async function doLiveIcon(hwnd: string | undefined, get: Getter, set: Setter) {
    try {
        if (!hwnd) {
            throw new Error('No hwnd');
        }

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
            //console.log('test-offline:icon\n', JSON.stringify(res, null, 4));
        }

        napiBuildState.buildError = '';
    } catch (error) {
        set(sawIconStrAtom, '');
        set(sawIconAtom, null);

        napiBuildState.buildError = getSubError(error);

        console.error(`'doGetWindowIconAtom' ${error instanceof Error ? error.message : `${error}`}`);
    }
}

async function doTestIcon(hwnd: string | undefined, get: Getter, set: Setter) {
    if (lastTestCreateHwnd === debugSettings.testCreate.hwnd) {
        return;
    }
    lastTestCreateHwnd = debugSettings.testCreate.hwnd;

    const testHwnd = (await set(doLoadFakeHwndAtom, debugSettings.testCreate.hwnd)) as unknown as TestHwnd;
    set(sawIconStrAtom, JSON.stringify(testHwnd));

    if (testHwnd?.icon?.data) {
        const image = new Image();
        image.src = `data:image/png;base64,${testHwnd.icon.data}`;
        set(sawIconAtom, image);
    } else {
        set(sawIconAtom, null);
    }
}

let lastTestCreateHwnd: typeof debugSettings.testCreate.hwnd = 'none';

/* export const currentWindowIconAtom = atom(
    (get) => {
        const sawHandle = get(sawHandleAtom);
        if (sawHandle?.hwnd) {
            // cannot call set call of doGetWindowIconAtom
        }
    }
)
*/
