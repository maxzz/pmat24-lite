import { atom } from "jotai";
import { toast } from "sonner";
import { invokeMainTyped } from "@/xternal-to-main";

export const doGetGeneralInfoAtom = atom(
    null,
    async (get, set): Promise<string> => {
        try {
            const data = await invokeMainTyped({ type: 'r2mi:get-general-info' });
            if (data) {
                console.log('general.info:', data);
            }
            return data;
        } catch (error) {
            toast.error(`Cannot get general info: ${error}`);
            return '';
        }
    }
);
