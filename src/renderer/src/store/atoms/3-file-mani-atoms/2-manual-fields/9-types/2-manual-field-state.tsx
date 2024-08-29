import { PrimitiveAtom } from "jotai";
import { AtomizeWithType } from "@/util-hooks";
import { EditorDataForKbd, EditorDataForPos, EditorDataForDly, EditorDataForFld, ChunkKey } from "@/store/manifest";
import { NormalField } from "../../1-normal-fields";
import { RowInputState } from "@/ui";

export namespace ManualFieldState {

    type ExtraForAtoms = {
        type: ChunkKey;
        uid5: number;                           // unique id for each row
        selectedAtom: PrimitiveAtom<boolean>;   // is atom selected now
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
}
