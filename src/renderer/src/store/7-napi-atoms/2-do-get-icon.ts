import { atom } from "jotai";
import { invokeMain } from "@/xternal-to-main";
import { maniBuildState } from "@/store/state-debug";
import { WindowIconGetterResult } from "@shared/ipc-types";
import { getSubError } from "@/utils";
//import { sawHandleAtom } from "./do-get-hwnd";

export const sawIconStrAtom = atom<string | undefined>(undefined);
export const sawIconAtom = atom<HTMLImageElement | null>(null);

type IconsCache = Map<string, string>; // hwnd -> string with WindowIconGetterResult

const iconsCache: IconsCache = new Map();

export const doGetWindowIconAtom = atom(
    null,
    async (get, set, hwnd: string | undefined): Promise<void> => {
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
            }

            maniBuildState.buildError = '';

            //console.log('doGetSawIconAtom.set', JSON.stringify(str, null, 4));
        } catch (error) {
            set(sawIconStrAtom, '');

            maniBuildState.buildError = getSubError(error);

            console.error(`'doGetWindowIconAtom' ${error instanceof Error ? error.message : `${error}`}`);
        }
    }
);

/* export const currentWindowIconAtom = atom(
    (get) => {
        const sawHandle = get(sawHandleAtom);
        if (sawHandle?.hwnd) {
            // cannot call set call of doGetWindowIconAtom
        }
    }
)
 */
