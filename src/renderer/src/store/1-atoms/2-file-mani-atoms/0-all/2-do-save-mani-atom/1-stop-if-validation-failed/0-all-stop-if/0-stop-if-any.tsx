import { type Getter, type Setter } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type AnyFormCtx, type VerifyError } from "../../../../9-types";
import { doVerifyNormalFormsAtom } from "./1-do-verify-normal-forms";
import { doVerifyManualFormsAtom } from "./2-do-verify-manual-forms";
import { doVerifyOptionsAtom } from "./3-do-verify-options";
import { showValidationErrors } from "./8-show-validation-errors";

export function stopIfInvalidAny(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    const [login, cpass] = maniAtoms;

    const isInvalid =
        stopIfInvalid_Mani(maniAtoms, get, set) ||
        stopIfInvalid_Options(maniAtoms, get, set) ||
        isInvalidForm(login, maniAtoms, FormIdx.login, get, set) ||
        isInvalidForm(cpass, maniAtoms, FormIdx.cpass, get, set);

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

function stopIfInvalid_Options(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    const errors = set(doVerifyOptionsAtom, { maniAtoms });

    const rv = showValidationErrors({ fromTab: 'options', verifyErrors: errors });
    return rv;
}

function isInvalidForm(form: AnyFormCtx | undefined, maniAtoms: ManiAtoms, formIdx: FormIdx, get: Getter, set: Setter): boolean | undefined {

    const verifyAtom = form?.normal ? doVerifyNormalFormsAtom : form?.manual ? doVerifyManualFormsAtom : undefined;
    if (!verifyAtom) {
        return true;
    }

    const errors: VerifyError[] | undefined = set(verifyAtom, { maniAtoms });
    if (!errors?.length) {
        return false;
    }

    const rv = showValidationErrors({ fromTab: errors[0].tab, verifyErrors: errors }); // errors[0].tab or 'login'
    return rv;
}

//TODO: manual validation: activate row
//TODO: manual validation: activate initial row
//TODO: options validation: activate row (balloon)
