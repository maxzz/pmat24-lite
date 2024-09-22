import { FormIdx } from "@/store/manifest";
import { type AnyFormAtoms } from "../../9-types";
import { type ResetManifestDataParams } from "./9-types";
import { resetNormalFieldsAndSubmit } from "./2-reset-normal-fields";
import { resetManualFields } from "./3-reset-manual-fields";
import { resetFormOptions } from "./4-reset-options";

export function resetManifest(packParams: ResetManifestDataParams) {
    const { maniAtoms } = packParams;
    const [loginFormAtoms, cpassFormAtoms] = maniAtoms;

    resetForm(loginFormAtoms, FormIdx.login, packParams);
    resetForm(cpassFormAtoms, FormIdx.cpass, packParams);
}

function resetForm(form: AnyFormAtoms | undefined, formIdx: FormIdx, packParams: ResetManifestDataParams) {
    if (form) {
        resetFormOptions(form.options, packParams);

        if (form.normal) {
            resetNormalFieldsAndSubmit(form.normal, formIdx, packParams);
        }

        if (form.manual) {
            resetManualFields(form.manual, formIdx, packParams);
        }
    }
}
