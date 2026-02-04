import { type Mani, createGuid, FormIdx, TimeUtils } from "@/store/8-manifest";
import { type AnyFormCtx } from "@/store/2-file-mani-atoms/9-types";
import { PackManifestDataParams } from "../9-types";
import { packFormOptions } from "../3-options";
import { packNormalFieldsAndSubmit } from "../1-normal";
import { packManualFields } from "../2-manual";
import { print_PackedFields } from "@/store/2-file-mani-atoms/8-print-fields";

export function packManifest(packParams: PackManifestDataParams): void {
    const { maniAtoms } = packParams;
    const [loginFormCtx, cpassFormCtx] = maniAtoms;

    packDescriptor(packParams);

    packForm(loginFormCtx, FormIdx.login, packParams);
    packForm(cpassFormCtx, FormIdx.cpass, packParams);

    convertCpassUuidToIdx(packParams.newMani.forms);
}

function packDescriptor(packParams: PackManifestDataParams): void {
    const { newMani } = packParams;

    const { fileUs } = packParams;

    let descriptor = fileUs.parsedSrc.mani?.descriptor;

    descriptor =
        descriptor
            ? { ...descriptor, }
            : { id: `{${createGuid()}}`, created: TimeUtils.timeNowAsDpTime(), } as Mani.Descriptor;

    descriptor.modified = TimeUtils.timeNowAsDpTime();
    descriptor.version = '2.4.5';

    newMani.descriptor = descriptor;

    fileUs.parsedSrc.mani?.options && (newMani.options = fileUs.parsedSrc.mani.options);
}

function packForm(form: AnyFormCtx | undefined, formIdx: FormIdx, packParams: PackManifestDataParams): void {
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

        print_PackedFields(newForm.fields, { label: `PackForm ${formIdx ? 'cpass' : 'login'} fields:\n`, keepEmptyvalues: false });
    }
}

/**
 * Convert cpass fields rfieldindex to login fields rfieldindex.
 */
function convertCpassUuidToIdx(forms: Mani.Form[] | undefined) {
    const loginFields = forms?.[FormIdx.login]?.fields || [];
    const cpassFields = forms?.[FormIdx.cpass]?.fields || [];

    cpassFields.forEach(
        (field: Mani.Field) => {
            const rfieldUuid = field.rfieldindex;
            if (rfieldUuid) {
                const loginIdx = loginFields.findIndex((loginField) => loginField.memOnly?.uuidThis === rfieldUuid);
                field.rfieldindex = loginIdx >= 0 ? loginIdx : undefined;
            }
        }
    );

}
