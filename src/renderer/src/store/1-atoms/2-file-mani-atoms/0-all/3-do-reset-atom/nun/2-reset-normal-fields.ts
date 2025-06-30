import { type EditorField, type FormIdx } from "@/store/manifest";
import { type NFormCnt } from "../../../9-types";
import { type ResetManifestCtx } from "./9-types";
import { NormalFieldConv, SubmitConv, type SubmitFieldTypes } from "../../../1-normal-fields";

export function resetNormalFieldsAndSubmit(cnt: NFormCnt, formIdx: FormIdx, ctx: ResetManifestCtx) {
    const { get, set } = ctx;
    const { rowCtxs, submitCtx } = cnt;

    rowCtxs.forEach(
        (rowCtx) => {
            const values: EditorField.ForAtoms = rowCtx.fromFile;
            NormalFieldConv.valuesToAtoms(values, rowCtx, get, set);
        }
    );

    const submitValues: SubmitFieldTypes.ForAtoms = submitCtx.fromFile;
    SubmitConv.valuesToAtoms(submitValues, submitCtx, get, set);
}
