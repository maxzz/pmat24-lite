import { TargetClientRect } from "@shared/ipc-types";
import { atom } from "jotai";
import { sawHandleAtom } from "../1-do-get-hwnd";
import { R2MCalls } from "@/xternal-to-main";
import { nonReactiveLock } from "../9-napi-build-state";

export const doHighlightRectAtom = atom(
    null,
    (get, set, { hwnd, rect }: { hwnd?: string, rect: TargetClientRect | undefined; }) => {
        if (nonReactiveLock.isNapiLocked()) {
            return;
        }

        if (!rect) {
            nonReactiveLock.locked = false;
            return;
        }

        if (hwnd === undefined) {
            const sawHandle = get(sawHandleAtom);
            hwnd = sawHandle?.hwnd;
        }

        if (hwnd) {
            R2MCalls.highlightRect(hwnd, rect);
        }

        nonReactiveLock.unlock();
    }
);
