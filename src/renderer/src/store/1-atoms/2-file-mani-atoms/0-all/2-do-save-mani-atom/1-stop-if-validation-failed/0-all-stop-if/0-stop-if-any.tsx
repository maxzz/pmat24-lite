import { type Getter, type Setter } from "jotai";
import { FormIdx } from "@/store/manifest";
import { VerifyError, type AnyFormCtx, type ManiAtoms } from "../../../../9-types";
import { doVerifyManualFormAtom, doVerifyNormalFormAtom, doVerifyOptionsAtom } from "../1-do-verify-atoms";
import { showValidationErrors } from "./8-show-validation-errors";

export function stopIfInvalidAny(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {

    if (stopIfInvalid_Mani(maniAtoms, get, set)) {
        return true;
    }

    if (stopIfInvalid_Options(maniAtoms, get, set)) {
        return true;
    }

    const [login, cpass] = maniAtoms;

    if (isInvalidForm(login, maniAtoms, FormIdx.login, get, set)) {
        return true;
    }

    if (isInvalidForm(cpass, maniAtoms, FormIdx.cpass, get, set)) {
        return true;
    }
}

function isInvalidForm(form: AnyFormCtx | undefined, maniAtoms: ManiAtoms, formIdx: FormIdx, get: Getter, set: Setter): boolean | undefined {
    if (form) {
        if (form.normal) {
            if (stopIfInvalid_Normal(maniAtoms, get, set)) {
                return true;
            }
        }
        else if (form.manual) {
            if (stopIfInvalid_Manual(maniAtoms, get, set)) {
                return true;
            }
        }
    }
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

function stopIfInvalid_Normal(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    const errors: VerifyError[] = set(doVerifyNormalFormAtom, { maniAtoms }) || [];

    const rv = showValidationErrors({ fromTab: errors[0].tab, verifyErrors: errors }); // errors[0].tab or 'login'
    return rv;
}

function stopIfInvalid_Manual(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    const errors = set(doVerifyManualFormAtom, { maniAtoms });

    const rv = showValidationErrors({ fromTab: errors?.[0].tab, verifyErrors: errors });
    return rv;
}
//TODO: validation: activate row
//TODO: validation: activate initial row

function stopIfInvalid_Options(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    const errors = set(doVerifyOptionsAtom, { maniAtoms });

    const rv = showValidationErrors({ fromTab: 'options', verifyErrors: errors });
    return rv;
}
//TODO: validation: activate row (balloon)
