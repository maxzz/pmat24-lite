import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type VerifyError } from "@/store/2-file-mani-atoms/9-types";   
import { getVerifyErrors_NormalForm } from "./2-1-normal-verify-errors";
import { getVerifyErrors_ManualForm } from "./2-2-manual-verify-errors";
import { getVerifyErrors_FormOptionsTab } from "./2-3-options-verify-errors";

export function getErrorsFromForm(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    let errors =
        getVerifyErrors_NormalForm(maniAtoms, formIdx, getset) ||
        getVerifyErrors_ManualForm(maniAtoms, formIdx, getset);

    if (!errors?.length) {
        const optionsAtoms = maniAtoms[formIdx]?.options;
        errors = optionsAtoms && getVerifyErrors_FormOptionsTab(optionsAtoms, formIdx, getset);
    }

    return errors;
}

//TODO: manual validation: activate row
//TODO: manual validation: activate initial row
//TODO: options validation: activate row (balloon)
