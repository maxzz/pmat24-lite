import { atom } from "jotai";
import { PerformCommandParams } from "@shared/ipc-types";
import { invokeMainTyped } from "@/xternal-to-main";

export const doPerformCommandAtom = atom(
    null,
    async (get, set, params: PerformCommandParams): Promise<string> => {
        const data = await invokeMainTyped({ type: 'r2mi:perform-command', params });
        if (data) {
            console.log('failed: perform.command', data);
        }
        return data;
    }
);
