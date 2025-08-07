import { type AtomizeWithType } from "@/utils";
import { type EditorDataForKbd, type EditorDataForPos, type EditorDataForDly, type EditorDataForFld, type ChunkKey } from "@/store/manifest";
import { type FieldRowCtx } from "../../9-types";
import { type RowInputState } from "@/ui";

export namespace ManualFieldState {

    type CtxExtra = {
        type: ChunkKey;
        uid5: number;                // Unique id for each row
        selectedAtom: PA<boolean>;   // Is row selected now
        hasErrorAtom: PA<boolean>;   // Is there an error in the row
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
        rowCtx: FieldRowCtx;
        original: EditorDataForFld;             // this was used only by field catalog to check if field is from field catalog
    }>;

    export type Ctx = CtxKbd | CtxPos | CtxDly | CtxFld;
}
