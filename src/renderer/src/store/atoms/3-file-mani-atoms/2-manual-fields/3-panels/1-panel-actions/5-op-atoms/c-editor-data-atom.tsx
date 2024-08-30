import { atom } from "jotai";
import { ManualFieldState } from "../../../9-types";
import { ManualFieldConv } from "../../../0-conv";

export const editorDataForAtom = atom(
    (get) => (item: ManualFieldState.ForAtoms) => {
        const rv = ManualFieldConv.fromAtom(item, get);
        return rv;
    }
);
