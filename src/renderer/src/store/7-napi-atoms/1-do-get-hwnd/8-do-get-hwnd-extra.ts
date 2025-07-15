import { atom } from "jotai";
import { invokeMainTyped } from "@/xternal-to-main";
import { type WindowExtraResult, type R2MInvokeParams } from "@shared/ipc-types";

export const asyncGetWindowExtrasAtom = atom(
    null,
    async (get, set, params: R2MInvokeParams.GetWindowExtras): Promise<WindowExtraResult> => {
        const res = await invokeMainTyped({ type: 'r2mi:get-window-extras', ...params });
        const rv = JSON.parse(res) as WindowExtraResult;
        return rv;
    }
);
