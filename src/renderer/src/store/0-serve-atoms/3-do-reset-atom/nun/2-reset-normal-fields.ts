import { type EditorField } from "@/store/manifest";
import { type FileUsCtx, type NFormCnt } from "@/store/1-atoms/2-file-mani-atoms/9-types";
import { type ResetManifestCtx } from "./9-types";
import { type SubmitFieldTypes, NormalFieldConv, SubmitConv } from "@/store/1-atoms/2-file-mani-atoms/1-normal-fields";

export function resetNormalFieldsAndSubmit(nFormCnt: NFormCnt, fileUsCtx: FileUsCtx, ctx: ResetManifestCtx) {
    const { rowCtxs, submitCtx } = nFormCnt;

    rowCtxs.forEach(
        (rowCtx) => {
            const values: EditorField.ForAtoms = rowCtx.fromFile;
            NormalFieldConv.valuesToAtoms(values, rowCtx, ctx);
        }
    );

    const submitValues: SubmitFieldTypes.ForAtoms = submitCtx.fromFile;
    SubmitConv.valuesToAtoms(submitValues, submitCtx, ctx);
}
