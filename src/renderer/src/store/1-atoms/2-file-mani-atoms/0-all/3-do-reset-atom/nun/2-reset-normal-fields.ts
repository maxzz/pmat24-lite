import { type EditorField, type FormIdx } from "@/store/manifest";
import { type NFormCtx } from "../../../9-types";
import { type ResetManifestCtx } from "./../9-types";
import { NormalFieldConv, SubmitConv, type SubmitFieldTypes } from "../../../1-normal-fields";

export function resetNormalFieldsAndSubmit(formCtx: NFormCtx, formIdx: FormIdx, ctx: ResetManifestCtx) {
    const { get, set } = ctx;

    const { rowCtxs, submitCtx } = formCtx;

    rowCtxs.forEach(
        (rowCtx) => {
            const values: EditorField.ForAtoms = rowCtx.fromFile;
            NormalFieldConv.valuesToAtoms(values, rowCtx, get, set);
        }
    );

    const submitValues: SubmitFieldTypes.ForAtoms = submitCtx.fromFile;
    SubmitConv.valuesToAtoms(submitValues, submitCtx, get, set);
}
