import { TargetClientRect } from "@electron/napi-calls";
import { atom } from "jotai";
import { sawHandleAtom, sendToMain } from "..";

export const doHighlightRectAtom = atom(
    null,
    (get, set, { hwnd, rect }: { hwnd?: string, rect: TargetClientRect | undefined; }) => {
        if (!rect) {
            return;
        }
        if (hwnd === undefined) {
            const sawHandle = get(sawHandleAtom);
            hwnd = sawHandle?.hwnd;
        }
        if (hwnd) {
            sendToMain({ type: 'highlight-rect', hwnd, rect });
        }
    }
);
