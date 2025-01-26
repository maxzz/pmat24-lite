import { atom } from "jotai";
// import { newManiCtx, type NewManiCtx } from "./0-ctx";
import { allScreenshotAtom } from "@/store";

const _appSelectedIdxAtom = atom(0);

export function createAppSelectedIdxAtom() {
    return atom(
        (get) => get(_appSelectedIdxAtom),
        (get, set, newIdx: number) => {
            // const ctx: NewManiCtx = newManiCtx;
            const current = get(_appSelectedIdxAtom);
            const items = get(allScreenshotAtom);

            if (current === newIdx) {
                items[current].editor.selected = false;
                set(_appSelectedIdxAtom, -1);
                return;
            }


            items.forEach((item, idx) => {
                item.editor.selected = idx === newIdx;
            });

            set(_appSelectedIdxAtom, newIdx);
        }
    );
}

export type CreateAppSelectedIdxAtom = ReturnType<typeof createAppSelectedIdxAtom>;
