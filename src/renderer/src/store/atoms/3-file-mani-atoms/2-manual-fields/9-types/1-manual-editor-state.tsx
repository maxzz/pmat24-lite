import { type PrimitiveAtom } from "jotai";
import { type OnValueChangeAny } from "@/util-hooks";
import { type OnChangeValueWithUpdateName } from "@/ui";
import { type ManualFieldState } from "./2-manual-field-state";

export namespace ManualEditorState {
    
    export type Ctx = {
        chunksAtom: PrimitiveAtom<ManualFieldState.ForAtoms[]>;
        initialChunks: string;              // initial chunks as concatenated string of uuids to compare with
        selectedIdxStoreAtom: PrimitiveAtom<number>;
        onChangeItem: OnChangeValueWithUpdateName;
        onChangeOrder: OnValueChangeAny;
    };
}

//TODO: Array of atoms for each script chunk
//TODO: where is guuid? for NormalField.FieldAtoms - OK
