import { AtomizeWithType } from "@/util-hooks";
import { EditorDataForKbd, EditorDataForPos, EditorDataForDly, EditorDataForFld, ScriptChunkEditorData, Meta, ChunkKey } from "pm-manifest";
import { NormalField } from "../../1-normal-field-atoms/0-conv";
import { RowInputState } from "@/ui";

export namespace ManualField {

    type ExtraForAtoms = {
        type: ChunkKey;
        uid5: number;       // unique id for each row
    };

    export type KbdForAtoms = Prettify<ExtraForAtoms & AtomizeWithType<Omit<EditorDataForKbd, 'type'>, RowInputState> & {
        type: 'kbd';
    }>;

    export type PosForAtoms = Prettify<ExtraForAtoms & AtomizeWithType<Omit<EditorDataForPos, 'type'>, RowInputState> & {
        type: 'pos';
    }>;

    export type DlyForAtoms = Prettify<ExtraForAtoms & AtomizeWithType<Omit<EditorDataForDly, 'type'>, RowInputState> & {
        type: 'dly';
    }>;

    export type FldForAtoms =  Prettify<ExtraForAtoms& {
        type: 'fld';
        field: NormalField.FieldAtoms;
    }>;

    export type ForAtoms = KbdForAtoms | PosForAtoms | DlyForAtoms | FldForAtoms;

    type FieldForAtoms = {
        scr: ScriptChunkEditorData;
    };

    // type Extra2ForAtoms = {
    //     metaField: Meta.Field;      // all fields from original to combine with fields from atoms to create new field
    //     fromFile: FieldForAtoms;    // original state to compare with
    //     changed: boolean;           // state from atoms is different from original state
    // };

    type ScriptAtoms = Prettify<
        & ForAtoms
        & {
            metaField: Meta.Field;      // all fields from original to combine with fields from atoms to create new field
            fromFile: FieldForAtoms;    // original state to compare with
            changed: boolean;           // state from atoms is different from original state
        }
    >;
}

//TODO: Array of atoms for each script chunk
