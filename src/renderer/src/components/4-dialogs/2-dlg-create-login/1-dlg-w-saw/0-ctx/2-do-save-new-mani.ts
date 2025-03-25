import { atom } from "jotai";
import { notImplYet } from "@/ui";

export const doSaveNewManiAtom = atom(
    null,
    async (get, set): Promise<boolean> => {
        notImplYet.onClick();
        
        return false;
    }
);
