import { type Getter, type Setter } from "jotai";
import { type ManiAtoms, type VerifyError } from "../../../../9-types";
import { doVerifyNormalFormsAtom } from "./1-do-verify-normal-forms";
import { doVerifyManualFormsAtom } from "./2-do-verify-manual-forms";
import { doVerifyOptionsAtom } from "./3-do-verify-options";
import { showValidationErrors } from "./8-show-validation-errors";

export function stopIfInvalidAny(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    const [login, cpass] = maniAtoms;

    const isInvalid =
        stopIfInvalid_Mani(maniAtoms, get, set) ||
        stopIfInvalidForms(maniAtoms, get, set);

    return isInvalid;
}

function stopIfInvalid_Mani(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    const errors: VerifyError[] = [];

    const [login, cpass] = maniAtoms;
    if (!login) {
        errors.push({ error: 'Login form is missing', tab: 'options' });
    }

    const rv = showValidationErrors({ fromTab: errors[0].tab, verifyErrors: errors }); // errors[0].tab or 'login'
    return rv;
}

function stopIfInvalidForms(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {

    const errors: VerifyError[] | undefined =
        set(doVerifyOptionsAtom, { maniAtoms }) ||
        set(doVerifyNormalFormsAtom, { maniAtoms }) ||
        set(doVerifyManualFormsAtom, { maniAtoms });

    if (!errors?.length) {
        return false;
    }

    const rv = showValidationErrors({ fromTab: errors[0].tab, verifyErrors: errors }); // errors[0].tab or 'login'
    return rv;
}

//TODO: manual validation: activate row
//TODO: manual validation: activate initial row
//TODO: options validation: activate row (balloon)
