import { PrimitiveAtom } from "jotai";
import { ManualFieldState } from "./2-manual-field-state";

export namespace ManualEditorState {
    
    // type FieldForAtoms = {
    //     scr: ScriptChunkEditorData;
    // };

    // type Extra2ForAtoms = {
    //     metaField: Meta.Field;      // all fields from original to combine with fields from atoms to create new field
    //     fromFile: FieldForAtoms;    // original state to compare with
    //     changed: boolean;           // state from atoms is different from original state
    // };

    // type ScriptAtoms = Prettify<
    //     & ForAtoms
    //     & {
    //         metaField: Meta.Field;      // all fields from original to combine with fields from atoms to create new field
    //         fromFile: FieldForAtoms;    // original state to compare with
    //         changed: boolean;           // state from atoms is different from original state
    //     }
    // >;

    // type ScriptAtoms = Prettify<
    //     & ForAtoms[]
    //     & {
    //         changed: boolean;           // state from atoms is different from original state
    //     }
    // >;

    export type ScriptAtoms = {
        chunks: PrimitiveAtom<ManualFieldState.ForAtoms[]>;
        initialChunks: string;              // initial chunks as concatenated string of uuids to compare with
    };
}

//TODO: Array of atoms for each script chunk
//TODO: where is guuid? for NormalField.FieldAtoms - OK
