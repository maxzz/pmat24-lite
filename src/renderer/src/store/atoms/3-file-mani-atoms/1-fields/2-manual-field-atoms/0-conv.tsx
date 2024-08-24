import { Getter, Setter } from "jotai";
import { Atomize, OnValueChangeAny, atomWithCallback } from "@/util-hooks";
import { EditorDataForDly, EditorDataForFld, EditorDataForKbd, EditorDataForPos, FieldTyp, Mani, Meta, ScriptChunkEditorData, TransformValue, ValueLife, fieldTyp2Obj, fieldTyp4Str, parseForEditor } from "pm-manifest";
import { FileMani } from "@/store/manifest/1-file-mani";
import { NormalFieldConv } from "../1-normal-field-atoms/0-conv";

export namespace ManualFieldConv {

    export type ActionKbdForAtoms = Omit<EditorDataForKbd, 'type'>;
    export type ActionFldForAtoms = Omit<EditorDataForFld, 'type'>;
    export type ActionPosForAtoms = Omit<EditorDataForPos, 'type'>;
    export type ActionDlyForAtoms = Omit<EditorDataForDly, 'type'>;

    export type ItemKbdForAtoms = {
        field: NormalFieldConv.FieldForAtoms;
    };

    export type ItemFldForAtoms = {
        field: NormalFieldConv.FieldForAtoms;
    };

    export type FieldForAtoms = {
        scr: ScriptChunkEditorData;
    };

    export type FieldAtoms = Prettify<
        & Atomize<FieldForAtoms>
        & {
            metaField: Meta.Field;      // all fields from original to combine with fields from atoms to create new field
            fromFile: FieldForAtoms;    // original state to compare with
            changed: boolean;           // state from atoms is different from original state
        }
    >;

    export function forAtoms(fields: Meta.Field[]): ScriptChunkEditorData[] {
        const chunks = parseForEditor(fields);
        return chunks;
    }
}
