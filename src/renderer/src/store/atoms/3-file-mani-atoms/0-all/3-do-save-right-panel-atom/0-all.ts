import { atom } from "jotai";
import { rightPanelAtom } from "@/store/atoms/2-right-panel";
import { doSaveOneAtom } from "../2-do-save-main-atom";

export const doSaveRightPanelFileAtom = atom(null,
    (get, set) => {
        const fileUsAtom = get(rightPanelAtom);
        if (!fileUsAtom) {
            return;
        }

        set(doSaveOneAtom, fileUsAtom);
    }
);
