import { atom } from "jotai";
import { toast } from "sonner";
import { invokeMainTyped } from "@/xternal-to-main";

export const doGetGeneralInfoAtom = atom(
    null,
    async (get, set): Promise<string> => {
        try {
            const rv = await invokeMainTyped({ type: 'r2mi:get-general-info' }); // JSON.parse(rv) as GeneralInfoResult
            return rv;
        } catch (error) {
            toast.error(`Cannot get general info: ${error}`);
            return '';
        }
    }
);
