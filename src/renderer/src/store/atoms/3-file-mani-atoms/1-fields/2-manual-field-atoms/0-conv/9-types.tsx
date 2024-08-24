import { AtomizeWithType } from "@/util-hooks";
import { EditorDataForKbd, EditorDataForPos, EditorDataForDly, EditorDataForFld, ScriptChunkEditorData, Meta } from "pm-manifest";
import { NormalFieldConv } from "../../1-normal-field-atoms/0-conv";
import { RowInputState } from "@/ui";

export namespace ManualField {

    export type ActionKbdForAtoms = Omit<EditorDataForKbd, 'type'>;
    export type ActionPosForAtoms = Omit<EditorDataForPos, 'type'>;
    export type ActionDlyForAtoms = Omit<EditorDataForDly, 'type'>;
    export type ActionFldForAtoms = Omit<EditorDataForFld, 'type'>;

    export type FieldForAtoms = {
        scr: ScriptChunkEditorData;
    };

    export type KbdForAtoms = AtomizeWithType<ActionKbdForAtoms, RowInputState> & {
        type: 'kbd';
    };

    export type PosForAtoms = Prettify<AtomizeWithType<ActionPosForAtoms, RowInputState> & {
        type: 'pos';
    }>;

    export type DlyForAtoms = AtomizeWithType<ActionDlyForAtoms, RowInputState> & {
        type: 'dly';
    };

    export type FldForAtoms = {
        type: 'fld';
        field: NormalFieldConv.FieldAtoms;
    };

    export type ScriptTypesAtoms = KbdForAtoms | PosForAtoms | DlyForAtoms | FldForAtoms;

    export type ScriptAtoms = Prettify<
        & ScriptTypesAtoms
        & {
            metaField: Meta.Field;      // all fields from original to combine with fields from atoms to create new field
            fromFile: FieldForAtoms;    // original state to compare with
            changed: boolean;           // state from atoms is different from original state
        }
    >;
}
