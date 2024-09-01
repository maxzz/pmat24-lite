import { atom } from "jotai";
import { ManualFieldState } from "../../../9-types";
import { ManualFieldConv } from "../../../0-conv";

const editorDataForAtom = atom(
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

//G: 'jotai get atom with parameters'
//https://github.com/pmndrs/jotai/issues/707 [Question] Readable atom with parameter or Another way # 707