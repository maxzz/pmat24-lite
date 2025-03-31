import { TargetClientRect } from "@shared/ipc-types";
import { atom } from "jotai";
import { R2MCalls } from "@/xternal-to-main";
import { napiLock } from "../9-napi-build-state";

export const doHighlightRectAtom = atom(
    null,
    (get, set, { hwnd, rect, accId }: { hwnd: string | undefined, rect?: TargetClientRect | undefined; accId?: number; }) => {
        if (!hwnd || (!rect && accId === undefined)) {
            console.log('invalid params');
            return;
        }

        if (napiLock.locked('high')) {
            return;
        }

        R2MCalls.highlightField({ hwnd, rect, accId });

        napiLock.unlock();
    }
);
