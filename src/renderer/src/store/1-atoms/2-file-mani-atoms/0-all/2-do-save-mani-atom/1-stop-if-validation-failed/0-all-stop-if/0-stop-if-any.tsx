import { type Getter, type Setter } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type VerifyError } from "../../../../9-types";
import { normalFormsVerifyErrors } from "./1-normal-verify-errors";
import { manualFormsVerifyErrors } from "./2-manual-verify-errors";
import { optionsVerifyErrors } from "./3-options-verify-errors";
import { showValidationErrors } from "./8-show-validation-errors";

export function stopIfInvalidAny(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    const maniItself: VerifyError[] | undefined = maniAtoms[FormIdx.login] ? undefined : [{ error: 'Login form is missing', tab: 'options' }];

    const errors: VerifyError[] | undefined =
        maniItself ||
        optionsVerifyErrors(get, set, { maniAtoms }) ||
        normalFormsVerifyErrors(get, set, { maniAtoms }) ||
        manualFormsVerifyErrors(get, set, { maniAtoms });

    if (!errors?.length) {
        return false;
    }

    showValidationErrors({ fromTab: errors[0].tab, verifyErrors: errors }); // errors[0].tab or 'login'
    return true;
}

//TODO: manual validation: activate row
//TODO: manual validation: activate initial row
//TODO: options validation: activate row (balloon)
