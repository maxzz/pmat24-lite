import { type FormIdx } from "@/store/manifest";
import { type MFormCnt } from "../../../9-types";
import { type ResetManifestCtx } from "./9-types";
import { ManualFieldsState } from "../../../2-manual-fields";

export function resetManualFields(cnt: MFormCnt, formIdx: FormIdx, ctx: ResetManifestCtx) {
    const { get, set } = ctx;

    ManualFieldsState.resetChunks(cnt, formIdx, get, set);
}
