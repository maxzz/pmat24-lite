import { atom } from "jotai";
import { allScreenshotAtom } from "@/store";

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
                return;
            }

            items.forEach((item, idx) => (item.editor.selected = idx === newIdx));

            set(_appSelectedIdxAtom, newIdx);
        }
    );
}

export type AppSelectedIdxAtom = ReturnType<typeof create_AppSelectedIdxAtom>;
