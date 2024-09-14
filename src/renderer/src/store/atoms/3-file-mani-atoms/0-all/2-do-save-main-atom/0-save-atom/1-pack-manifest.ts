import { AnyFormAtoms } from "../../../9-types";
import { type PackManifestDataParams, packManualFields, packNormalFieldsAndSubmit, packOptions } from "../2-pack";

export function packManifest(packParams: PackManifestDataParams) {
    
    const { maniAtoms } = packParams;
    const [loginFormAtoms, cpassFormAtoms] = maniAtoms;

    packForm(loginFormAtoms, packParams);
    packForm(cpassFormAtoms, packParams);
}

function packForm(form: AnyFormAtoms | undefined, packParams: PackManifestDataParams) {
    if (form) {
        if (form.normal) {
            packNormalFieldsAndSubmit(form.normal, packParams);
        }
        if (form.manual) {
            packManualFields(form.manual, packParams);
        }
        packOptions(form.options, packParams);
    }
}
