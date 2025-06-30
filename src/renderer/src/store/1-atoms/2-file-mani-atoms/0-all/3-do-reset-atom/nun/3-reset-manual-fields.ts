import { type FormIdx } from "@/store/manifest";
import { type MFormCtx } from "../../../9-types";
import { type ResetManifestCtx } from "./9-types";
import { ManualFieldsState } from "../../../2-manual-fields";

export function resetManualFields(formCtx: MFormCtx, formIdx: FormIdx, ctx: ResetManifestCtx) {
    const { get, set } = ctx;

    ManualFieldsState.resetChunks(formCtx, formIdx, get, set);
}
