import { atom } from "jotai";
import { invokeMainTyped } from "@/xternal-to-main";
import { type PerformCommandParams } from "@shared/ipc-types";

export const doPerformCommandAtom = atom(
    null,
    async (get, set, params: PerformCommandParams): Promise<string> => {
        const data = await invokeMainTyped({ type: 'r2mi:perform-command', params });
        if (data) {
            console.log('perform.command.data:', data);
        }
        return data;
    }
);
