import { atom } from "jotai";
import { napiLock } from "../9-napi-build-state";
import { type R2MInvokeParams } from "@shared/ipc-types";
import { R2MInvokes } from "@/xternal-to-main";

export const doHighlightFieldAtom = atom(
    null,
    async (get, set, { hwnd, rect, accId }: R2MInvokeParams.HighlightField): Promise<string | undefined> => {
        if (!hwnd || (!rect && accId === undefined)) {
            console.log('invalid params');
            return;
        }

        if (napiLock.locked('high')) {
            return;
        }

        try {
            const rv = await R2MInvokes.highlightField({ hwnd, rect, accId });
            return rv;
        } catch (error) {
            console.error('error', error);
        }
        finally {
            napiLock.unlock();
        }

    }
);
