import { TargetClientRect } from "@shared/ipc-types";
import { atom } from "jotai";
import { sawHandleAtom } from "./do-get-hwnd";
import { R2MCalls } from "@/xternal-to-main";

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
            R2MCalls.highlightRect(hwnd, rect);
        }
    }
);
