import { atom } from "jotai";
import { napiLock } from "../9-napi-build-state";
import { type R2MParams } from "@shared/ipc-types";
import { R2MCalls } from "@/xternal-to-main";

export const doHighlightFieldAtom = atom(
    null,
    (get, set, { hwnd, rect, accId }: R2MParams.HighlightRect) => {
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
