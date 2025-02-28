import { atom } from "jotai";
import { getXmlCreateFileUs } from "../../0-ctx-new-mani";

export const showProgressAtom = atom(false);

export const moveToSecondDlgAtom = atom(
    null,
    async (get, set, { hwnd}: { hwnd: string; }): Promise<boolean> => {

        const move = await getXmlCreateFileUs({ hwnd, showProgressAtom, get, set });
        if (!move) {
            return false;
        }

        return true;
    }
);
