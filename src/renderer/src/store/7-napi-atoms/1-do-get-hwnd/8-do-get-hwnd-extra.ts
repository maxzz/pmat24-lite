import { atom } from "jotai";
import { WindowExtraResult, type R2MInvokeParams } from "@shared/ipc-types";
import { invokeMainTyped } from "@/xternal-to-main";

export const asyncGetWindowExtrasAtom = atom(
    null,
    async (get, set, params: R2MInvokeParams.GetWindowExtras): Promise<WindowExtraResult> => {
        const res = await invokeMainTyped({ type: 'r2mi:get-window-extras', ...params });
        const rv = JSON.parse(res) as WindowExtraResult;
        return rv;
    }
);
