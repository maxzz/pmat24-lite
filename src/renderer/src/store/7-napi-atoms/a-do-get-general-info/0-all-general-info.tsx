import { atom } from "jotai";
import { invokeMainTyped } from "@/xternal-to-main";

export const doGetGeneralInfoAtom = atom(
    null,
    async (get, set): Promise<string> => {
        const data = await invokeMainTyped({ type: 'r2mi:get-general-info' });
        if (data) {
            console.log('failed: general.info', data);
        }
        return data;
    }
);
