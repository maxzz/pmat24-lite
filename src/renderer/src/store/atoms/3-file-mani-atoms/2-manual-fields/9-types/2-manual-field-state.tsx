import { type PrimitiveAtom } from "jotai";
import { type AtomizeWithType } from "@/util-hooks";
import { type EditorDataForKbd, type EditorDataForPos, type EditorDataForDly, type EditorDataForFld, type ChunkKey } from "@/store/manifest";
import { type NormalField } from "../../1-normal-fields";
import { type RowInputState } from "@/ui";

export namespace ManualFieldState {

    type CtxExtra = {
        type: ChunkKey;
        uid5: number;                           // unique id for each row
        selectedAtom: PrimitiveAtom<boolean>;   // is atom selected now
        hasErrorAtom: PrimitiveAtom<boolean>;   // is atom has error
    };

    export type KbdForAtoms = Prettify<CtxExtra & AtomizeWithType<Omit<EditorDataForKbd, 'type'>, RowInputState> & {
        type: 'kbd';
        original: EditorDataForKbd;
    }>;

    export type PosForAtoms = Prettify<CtxExtra & AtomizeWithType<Omit<EditorDataForPos, 'type'>, RowInputState> & {
        type: 'pos';
        original: EditorDataForPos;
    }>;

    export type DlyForAtoms = Prettify<CtxExtra & AtomizeWithType<Omit<EditorDataForDly, 'type'>, RowInputState> & {
        type: 'dly';
        original: EditorDataForDly;
    }>;

    export type FldForAtoms = Prettify<CtxExtra & {
        type: 'fld';
        rowCtx: NormalField.RowCtx;
        original: EditorDataForFld;
    }>;

    export type ForAtoms = KbdForAtoms | PosForAtoms | DlyForAtoms | FldForAtoms;
}
