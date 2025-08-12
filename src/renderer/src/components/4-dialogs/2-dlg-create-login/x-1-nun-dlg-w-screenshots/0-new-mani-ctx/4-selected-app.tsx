import { atom } from "jotai";
import { allScreenshotAtom } from "@/store/7-napi-atoms";
import { doInitNewManiContentAtom } from "@/store/1-atoms/0-all-serve-atoms";
import { newManiCtx } from "./0-ctx";

const _appSelectedIdxAtom = atom(0);

export function create_AppSelectedIdxAtom() {
    return atom(
        (get) => get(_appSelectedIdxAtom),
        (get, set, newIdx: number) => {
            const items = get(allScreenshotAtom);
            const currentIdx = get(_appSelectedIdxAtom);

            if (currentIdx === newIdx) {
                currentIdx !== -1 && (items[currentIdx].editor.selected = false);
                set(_appSelectedIdxAtom, -1);
            } else {
                items.forEach((item, idx) => (item.editor.selected = idx === newIdx));
                set(_appSelectedIdxAtom, newIdx);
            }

            newManiCtx.lastSelectedHwnd = items[newIdx]?.item.hwnd;

            set(doInitNewManiContentAtom);
        }
    );
}

export type AppSelectedIdxAtom = ReturnType<typeof create_AppSelectedIdxAtom>;

//

export const appSelectedAppAtom = atom(
    (get) => {
        const idx = get(_appSelectedIdxAtom);
        return idx === -1 ? undefined : get(allScreenshotAtom)[idx];
    }
);

//TODO: need to reset xml and fileUs when app selected
//TODO: highlight application window rect; to unsure that it's the right window
