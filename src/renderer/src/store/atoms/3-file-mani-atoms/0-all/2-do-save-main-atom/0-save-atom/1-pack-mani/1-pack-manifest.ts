import { FormIdx } from "@/store/manifest";
import { type AnyFormAtoms } from "../../../../9-types";
import { type PackManifestDataParams, packManualFields, packNormalFieldsAndSubmit, packFormOptions } from "../../2-pack";
import { createGuid, Mani, TimeUtils } from "@/store/manifest";

export function packManifest(packParams: PackManifestDataParams) {
    const { maniAtoms } = packParams;
    const [loginFormAtoms, cpassFormAtoms] = maniAtoms;

    packDescriptor(packParams);

    packForm(loginFormAtoms, FormIdx.login, packParams);
    packForm(cpassFormAtoms, FormIdx.cpass, packParams);
}

function packDescriptor(packParams: PackManifestDataParams) {
    const { newMani } = packParams;

    const { fileUs } = packParams;

    let descriptor = fileUs.parsedSrc.mani?.descriptor;

    descriptor = descriptor
        ? { ...descriptor, }
        : { id: `{${createGuid()}}`, created: TimeUtils.timeNowAsDpTime(), } as Mani.Descriptor;

    descriptor.modified = TimeUtils.timeNowAsDpTime();
    descriptor.version = '2.4.5';

    newMani.descriptor = descriptor;

    fileUs.parsedSrc.mani?.options && (newMani.options = fileUs.parsedSrc.mani.options);
}

function packForm(form: AnyFormAtoms | undefined, formIdx: FormIdx, packParams: PackManifestDataParams) {
    if (form) {
        const { newMani } = packParams;

        const { detection, options } = packFormOptions(form.options, formIdx, packParams);

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
        else if (form.manual) {
            const fields = packManualFields(form.manual, formIdx, packParams);
            newForm.fields = fields;
        }

        console.log('%cnewForm.fields', 'color: cyan', JSON.stringify(newForm.fields, null, 2));
    }
}
