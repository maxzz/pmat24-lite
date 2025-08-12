import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type VerifyError } from "@/store/1-atoms/2-file-mani-atoms/9-types";   
import { FormOptionsConv } from "@/store/1-atoms/2-file-mani-atoms/3-options";
import { normalFormVerifyErrors } from "./3-1-normal-verify-errors";
import { manualFormVerifyErrors } from "./3-2-manual-verify-errors";

export function getErrorsFromLogin(maniAtoms: ManiAtoms, getset: GetSet): VerifyError[] | undefined {
    return getErrorsFromForm(maniAtoms, FormIdx.login, getset);
}

export function getErrorsFromCpass(maniAtoms: ManiAtoms, getset: GetSet): VerifyError[] | undefined {
    return getErrorsFromForm(maniAtoms, FormIdx.cpass, getset);
}

function getErrorsFromForm(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    let errors =
        normalFormVerifyErrors(maniAtoms, formIdx, getset) ||
        manualFormVerifyErrors(maniAtoms, formIdx, getset);

    if (!errors?.length) {
        const optionsAtoms = maniAtoms[formIdx]?.options;
        errors = optionsAtoms && FormOptionsConv.getOptionsVerifyErrors_OfForm(optionsAtoms, formIdx, getset);
    }

    return errors;
}

//TODO: manual validation: activate row
//TODO: manual validation: activate initial row
//TODO: options validation: activate row (balloon)
