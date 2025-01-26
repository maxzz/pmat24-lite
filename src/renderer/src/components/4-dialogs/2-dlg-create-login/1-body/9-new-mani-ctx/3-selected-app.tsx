import { atom } from "jotai";
import { type NewManiCtx } from "./0-ctx";
import { allScreenshotAtom } from "@/store";

const _appSelectedIdxAtom = atom(0);

export function createAppSelectedIdxAtom() {
    return _appSelectedIdxAtom;
}

export function createDoSetAppSelectedIdxAtom() {
    return atom(
        null,
        (get, set, { ctx, idx }: { ctx: NewManiCtx; idx: number; }) => {
            const items = get(allScreenshotAtom)
            
            items.forEach((item, idx) => {
                item.editor.selected = idx === idx;
            });
            
            set(_appSelectedIdxAtom, idx);
        }
    );
}
