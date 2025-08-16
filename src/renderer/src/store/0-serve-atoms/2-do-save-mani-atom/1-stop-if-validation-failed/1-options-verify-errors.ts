import { type ManiAtoms, type VerifyError } from "@/store/2-file-mani-atoms/9-types";
import { FormOptionsConv } from "@/store/2-file-mani-atoms/3-options";
import { FormIdx } from "@/store/manifest";

export function getErrorsFromOptions(maniAtoms: ManiAtoms, getset: GetSet): VerifyError[] | undefined {
    const errors =
        optionsFormVerifyErrors(maniAtoms, FormIdx.login, getset) ||
        optionsFormVerifyErrors(maniAtoms, FormIdx.cpass, getset);
    return errors;
}

function optionsFormVerifyErrors(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    const rv: VerifyError[] = [];

    const formCtx = maniAtoms[formIdx];

    if (formCtx) {
        const errors = FormOptionsConv.getOptionsVerifyErrors_OfMain(formCtx.options, formIdx, getset);
        if (errors.length) {
            rv.push(...errors);
        }
    }

    return rv.length ? rv : undefined;
}
