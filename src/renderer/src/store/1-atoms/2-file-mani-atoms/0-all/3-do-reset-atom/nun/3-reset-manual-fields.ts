import { type FileUsCtx, type MFormCnt } from "../../../9-types";
import { type ResetManifestCtx } from "./9-types";
import { ManualFieldsState } from "../../../2-manual-fields";

export function resetManualFields(mFormCnt: MFormCnt, fileUsCtx: FileUsCtx, ctx: ResetManifestCtx) {
    const { get, set } = ctx;

    ManualFieldsState.resetChunks(mFormCnt, fileUsCtx, get, set);
}
