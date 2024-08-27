import { AtomizeWithType } from "@/util-hooks";
import { EditorDataForKbd, EditorDataForPos, EditorDataForDly, EditorDataForFld, ScriptChunkEditorData, Meta, ChunkKey } from "pm-manifest";
import { NormalField } from "../../1-normal-fields/1-fields/0-conv";
import { RowInputState } from "@/ui";
import { PrimitiveAtom } from "jotai";

export namespace ManualField {

    type ExtraForAtoms = {
        type: ChunkKey;
        uid5: number;       // unique id for each row
    };

    export type KbdForAtoms = Prettify<ExtraForAtoms & AtomizeWithType<Omit<EditorDataForKbd, 'type'>, RowInputState> & {
        type: 'kbd';
        original: EditorDataForKbd;
    }>;

    export type PosForAtoms = Prettify<ExtraForAtoms & AtomizeWithType<Omit<EditorDataForPos, 'type'>, RowInputState> & {
        type: 'pos';
        original: EditorDataForPos;
    }>;

    export type DlyForAtoms = Prettify<ExtraForAtoms & AtomizeWithType<Omit<EditorDataForDly, 'type'>, RowInputState> & {
        type: 'dly';
        original: EditorDataForDly;
    }>;

    export type FldForAtoms = Prettify<ExtraForAtoms & {
        type: 'fld';
        field: NormalField.FieldAtoms;
        original: EditorDataForFld;
    }>;

    export type ForAtoms = KbdForAtoms | PosForAtoms | DlyForAtoms | FldForAtoms;

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
    
    export type ScriptAtoms = PrimitiveAtom<ForAtoms[]>;

}

//TODO: Array of atoms for each script chunk
//TODO: where is guuid? for NormalField.FieldAtoms - OK
