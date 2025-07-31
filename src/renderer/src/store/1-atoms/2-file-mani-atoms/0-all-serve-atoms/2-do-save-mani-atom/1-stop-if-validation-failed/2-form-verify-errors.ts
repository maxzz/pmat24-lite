import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type VerifyError } from "../../../9-types";
import { normalFormVerifyErrors } from "./3-1-normal-verify-errors";
import { manualFormVerifyErrors } from "./3-2-manual-verify-errors";

export function getErrorsFromLogin(maniAtoms: ManiAtoms, getset: GetSet): VerifyError[] | undefined {
    const errors =
        normalFormVerifyErrors(maniAtoms, FormIdx.login, getset) ||
        manualFormVerifyErrors(maniAtoms, FormIdx.login, getset);
    return errors;
}

export function getErrorsFromCpass(maniAtoms: ManiAtoms, getset: GetSet): VerifyError[] | undefined {
    const errors =
        normalFormVerifyErrors(maniAtoms, FormIdx.cpass, getset) ||
        manualFormVerifyErrors(maniAtoms, FormIdx.cpass, getset);
    return errors;
}

//TODO: manual validation: activate row
//TODO: manual validation: activate initial row
//TODO: options validation: activate row (balloon)
