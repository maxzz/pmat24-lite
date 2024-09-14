import { AnyFormAtoms } from "../../../9-types";
import { type PackManifestDataParams, packManualFields, packNormalFieldsAndSubmit, packFormOptions } from "../2-pack";

export function packManifest(packParams: PackManifestDataParams) {
    
    const { maniAtoms } = packParams;
    const [loginFormAtoms, cpassFormAtoms] = maniAtoms;

    packForm(loginFormAtoms, packParams);
    packForm(cpassFormAtoms, packParams);
}

function packForm(form: AnyFormAtoms | undefined, packParams: PackManifestDataParams) {
    if (form) {
        packFormOptions(form.options, packParams); // This should be before packNormalFieldsAndSubmit or create nessary options inside packNormalFieldsAndSubmit

        if (form.normal) {
            packNormalFieldsAndSubmit(form.normal, packParams);
        }

        if (form.manual) {
            packManualFields(form.manual, packParams);
        }
    }
}
