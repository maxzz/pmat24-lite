import { FormIdx } from "@/store/manifest";
import { type AnyFormAtoms } from "../../9-types";
import { type ResetManifestCtx } from "./9-types";
import { resetNormalFieldsAndSubmit } from "./2-reset-normal-fields";
import { resetManualFields } from "./3-reset-manual-fields";
import { resetFormOptions } from "./4-reset-options";

export function resetManifest(ctx: ResetManifestCtx) {
    const { maniAtoms } = ctx;
    const [loginFormAtoms, cpassFormAtoms] = maniAtoms;

    resetForm(loginFormAtoms, FormIdx.login, ctx);
    resetForm(cpassFormAtoms, FormIdx.cpass, ctx);
}

function resetForm(form: AnyFormAtoms | undefined, formIdx: FormIdx, ctx: ResetManifestCtx) {
    if (form) {
        resetFormOptions(form.options, formIdx, ctx);

        if (form.normal) {
            resetNormalFieldsAndSubmit(form.normal, formIdx, ctx);
        }

        if (form.manual) {
            resetManualFields(form.manual, formIdx, ctx);
        }
    }
}
