import { atom } from "jotai";
import { type R2MInvokeParams, type WindowExtra } from "@shared/ipc-types";
import { invokeMainTyped } from "@/xternal-to-main";

export const asyncGetWindowExtrasAtom = atom(
    null,
    async (get, set, params: R2MInvokeParams.GetWindowExtras) => {
        const res = await invokeMainTyped({ type: 'r2mi:get-window-extras', ...params });
        const rv = JSON.parse(res) as WindowExtra[];
        return rv;
    }
)
