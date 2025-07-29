import { type Getter, type Setter } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type VerifyError } from "../../../../9-types";
import { doVerifyNormalFormsAtom } from "./1-do-verify-normal-forms";
import { doVerifyManualFormsAtom } from "./2-do-verify-manual-forms";
import { doVerifyOptionsAtom } from "./3-do-verify-options";
import { showValidationErrors } from "./8-show-validation-errors";

export function stopIfInvalidAny(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    const maniItself: VerifyError[] | undefined = maniAtoms[FormIdx.login] ? undefined : [{ error: 'Login form is missing', tab: 'options' }];

    const errors: VerifyError[] | undefined =
        maniItself ||
        doVerifyOptionsAtom(get, set, { maniAtoms }) ||
        doVerifyNormalFormsAtom(get, set, { maniAtoms }) ||
        doVerifyManualFormsAtom(get, set, { maniAtoms });

    if (!errors?.length) {
        return false;
    }

    const rv = showValidationErrors({ fromTab: errors[0].tab, verifyErrors: errors }); // errors[0].tab or 'login'
    return rv;
}

//TODO: manual validation: activate row
//TODO: manual validation: activate initial row
//TODO: options validation: activate row (balloon)
