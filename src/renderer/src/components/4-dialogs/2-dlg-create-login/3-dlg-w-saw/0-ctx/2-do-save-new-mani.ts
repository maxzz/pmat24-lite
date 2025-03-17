import { atom } from "jotai";

export const doSaveNewManiAtom = atom(
    null,
    async (get, set): Promise<boolean> => {
        return false;
    }
);
