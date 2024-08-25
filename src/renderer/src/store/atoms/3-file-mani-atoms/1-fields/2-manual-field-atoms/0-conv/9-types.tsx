import { AtomizeWithType } from "@/util-hooks";
import { EditorDataForKbd, EditorDataForPos, EditorDataForDly, EditorDataForFld, ScriptChunkEditorData, Meta } from "pm-manifest";
import { NormalField } from "../../1-normal-field-atoms/0-conv";
import { RowInputState } from "@/ui";

export namespace ManualField {

    export type KbdForAtoms = Prettify<AtomizeWithType<Omit<EditorDataForKbd, 'type'>, RowInputState> & {
        type: 'kbd';
    }>;

    export type PosForAtoms = Prettify<AtomizeWithType<Omit<EditorDataForPos, 'type'>, RowInputState> & {
        type: 'pos';
    }>;

    export type DlyForAtoms = Prettify<AtomizeWithType<Omit<EditorDataForDly, 'type'>, RowInputState> & {
        type: 'dly';
    }>;

    export type FldForAtoms = {
        type: 'fld';
        field: NormalField.FieldAtoms;
    };

    export type ForAtoms = KbdForAtoms | PosForAtoms | DlyForAtoms | FldForAtoms;

    type FieldForAtoms = {
        scr: ScriptChunkEditorData;
    };

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
