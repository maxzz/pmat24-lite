import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type VerifyError } from "@/store/2-file-mani-atoms/9-types";   
import { normalFormVerifyErrors } from "./2-1-normal-verify-errors";
import { manualFormVerifyErrors } from "./2-2-manual-verify-errors";
import { getOptionsVerifyErrors_OfForm } from "./3-1-options-verify";

export function getErrorsFromForm(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    let errors =
        normalFormVerifyErrors(maniAtoms, formIdx, getset) ||
        manualFormVerifyErrors(maniAtoms, formIdx, getset);

    if (!errors?.length) {
        const optionsAtoms = maniAtoms[formIdx]?.options;
        errors = optionsAtoms && getOptionsVerifyErrors_OfForm(optionsAtoms, formIdx, getset);
    }

    return errors;
}

//TODO: manual validation: activate row
//TODO: manual validation: activate initial row
//TODO: options validation: activate row (balloon)
