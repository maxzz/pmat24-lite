import { atom } from "jotai";
import { ManualFieldState } from "../../../9-types";
import { ManualFieldConv } from "../../../0-conv";

export const editorDataForAtom = atom(
    (get) => (item: ManualFieldState.ForAtoms) => {
        const rv = ManualFieldConv.fromAtom(item, get);
        return rv;
    }
);

// This is good for single access, but not for the access from multiple components
/*
    const isSelected = useAtomValue(chunk.selectedAtom);
    const chunkData: EditorDataForOne = useAtomValue(editorDataForAtom)(chunk);
*/