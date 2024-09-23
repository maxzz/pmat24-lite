import { FormIdx } from "@/store/manifest";
import { type AnyFormAtoms } from "../../../9-types";
import { type PackManifestDataParams, packManualFields, packNormalFieldsAndSubmit, packFormOptions } from "../2-pack";
import { packDescriptor } from "./2-pack-descriptor";

export function packManifest(packParams: PackManifestDataParams) {
    const { maniAtoms } = packParams;
    const [loginFormAtoms, cpassFormAtoms] = maniAtoms;

    packDescriptor(packParams);
    return;

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

        const newForm = newMani.forms[formIdx];

        if (form.normal) {
            const { newFields, submittype } = packNormalFieldsAndSubmit(form.normal, formIdx, packParams);
            newForm.fields = newFields;
            newForm.options.submittype = submittype;
        }

        if (form.manual) {
            const fields = packManualFields(form.manual, formIdx, packParams);
            newForm.fields = fields;
        }

        console.log('newForm', JSON.stringify(newForm, null, 2));
    }
}
