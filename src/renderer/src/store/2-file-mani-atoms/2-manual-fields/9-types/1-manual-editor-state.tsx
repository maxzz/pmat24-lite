import { type PrimitiveAtom } from "jotai";
import { type OnValueChangeAny } from "@/utils";
import { type OnChangeValueWithUpdateName } from "@/ui";
import { type ManualFieldState } from "./2-manual-field-state";
import { type EditorDataForOne } from "@/store/manifest";

export namespace ManualEditorTypes {
    
    export type Ctx = {
        chunksAtom: PrimitiveAtom<ManualFieldState.Ctx[]>;
        initialChunks: string;                              // initial chunks as concatenated string of uuids to compare with
        selectedIdxStoreAtom: PrimitiveAtom<number>;
        onChangeItem: OnChangeValueWithUpdateName;
        onChangeOrder: OnValueChangeAny;
        fromFile: EditorDataForOne[]
    };
}

//TODO: Array of atoms for each script chunk
//TODO: where is guid? for NormalField.FieldAtoms - OK
