import { FormIdx } from "@/store/manifest";
import { type AnyFormAtoms } from "../../../9-types";
import { type PackManifestDataParams, packManualFields, packNormalFieldsAndSubmit, packFormOptions } from "../2-pack";

export function packManifest(packParams: PackManifestDataParams) {
    const { maniAtoms } = packParams;
    const [loginFormAtoms, cpassFormAtoms] = maniAtoms;

    packForm(loginFormAtoms, FormIdx.login, packParams);
    packForm(cpassFormAtoms, FormIdx.cpass, packParams);
}

function packForm(form: AnyFormAtoms | undefined, formIdx: FormIdx, packParams: PackManifestDataParams) {
    if (form) {
        const { newMani } = packParams;

        const { detection, options } = packFormOptions(form.options, packParams);

        newMani.forms = newMani.forms || [];
        newMani.forms[formIdx] = {
            detection,
            options,
            fields: [],
        };

        if (form.normal) {
            const { newFields, submittype } = packNormalFieldsAndSubmit(form.normal, formIdx, packParams);
        }

        if (form.manual) {
            packManualFields(form.manual, formIdx, packParams);
        }
    }
}
