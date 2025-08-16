import { type FileUsCtx, type MFormCnt } from "@/store/2-file-mani-atoms/9-types";
import { ManualFieldsState } from "@/store/2-file-mani-atoms/2-manual-fields";
import { type ResetManifestCtx } from "./9-types";

export function resetManualFields(mFormCnt: MFormCnt, fileUsCtx: FileUsCtx, ctx: ResetManifestCtx) {
    const { get, set } = ctx;

    ManualFieldsState.resetChunks(mFormCnt, fileUsCtx, get, set);
}
