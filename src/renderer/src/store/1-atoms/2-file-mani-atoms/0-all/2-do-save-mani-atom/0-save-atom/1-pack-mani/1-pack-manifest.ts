import { type Mani, createGuid, FormIdx, TimeUtils } from "@/store/manifest";
import { type AnyFormAtoms } from "../../../../9-types";
import { type PackManifestDataParams, packManualFields, packNormalFieldsAndSubmit, packFormOptions } from "../../2-pack";
import { filterEmptyValues } from "../0-all/8-save-utils";

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

        printFields(`${formIdx ? 'cpass' : 'login'} fields:\n`, newForm.fields);
    }
}

function printFields(label: string, fields: Mani.Field[], keepEmptyvalues?: boolean) {
    const items =
        keepEmptyvalues
            ? fields
            : fields.map(
                (field) => {
                    const f = filterEmptyValues({ ...field });
                    delete f?.path_ext;
                    return f;
                }
            );
    console.log(`%c${label}`, 'color: cyan', JSON.stringify(items, null, 2));
}
