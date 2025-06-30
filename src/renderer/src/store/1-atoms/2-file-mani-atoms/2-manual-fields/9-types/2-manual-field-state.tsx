import { type PrimitiveAtom } from "jotai";
import { type AtomizeWithType } from "@/utils";
import { type EditorDataForKbd, type EditorDataForPos, type EditorDataForDly, type EditorDataForFld, type ChunkKey } from "@/store/manifest";
import { type NormalField } from "../../1-normal-fields";
import { type RowInputState } from "@/ui";

export namespace ManualFieldState {

    type CtxExtra = {
        type: ChunkKey;
        uid5: number;                           // unique id for each row
        selectedAtom: PrimitiveAtom<boolean>;   // is atom selected now
        hasErrorAtom: PrimitiveAtom<boolean>;   // is atom has error
        isCpassForm: boolean;                   // is this row inisde cpass form
    };

    export type CtxKbd = Prettify<CtxExtra & AtomizeWithType<Omit<EditorDataForKbd, 'type'>, RowInputState> & {
        type: 'kbd';
        original: EditorDataForKbd;
    }>;

    export type CtxPos = Prettify<CtxExtra & AtomizeWithType<Omit<EditorDataForPos, 'type'>, RowInputState> & {
        type: 'pos';
        original: EditorDataForPos;
    }>;

    export type CtxDly = Prettify<CtxExtra & AtomizeWithType<Omit<EditorDataForDly, 'type'>, RowInputState> & {
        type: 'dly';
        original: EditorDataForDly;
    }>;

    export type CtxFld = Prettify<CtxExtra & {
        type: 'fld';
        rowCtx: NormalField.RowCtx;
        original: EditorDataForFld;             // this was used only by field catalog to check if field is from field catalog
    }>;

    export type Ctx = CtxKbd | CtxPos | CtxDly | CtxFld;
}
