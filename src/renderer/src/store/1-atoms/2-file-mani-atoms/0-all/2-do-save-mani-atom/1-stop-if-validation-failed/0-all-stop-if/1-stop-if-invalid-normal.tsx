import { type Getter, type Setter } from "jotai";
import { type VerifyError, type ManiAtoms } from "../../../../9-types";
import { doVerifyNormalFormAtom } from "../1-do-verify-atoms";
import { showValidationErrors } from "./4-show-validation-errors";

export function stopIfInvalidNormal(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {

    const errors: VerifyError[] = set(doVerifyNormalFormAtom, { maniAtoms }) || [];

    const [login, cpass] = maniAtoms;
    if (!login) {
        errors.push({ error: 'Login form is missing', tab: 'options' });
    }

    const rv = showValidationErrors({ fromTab: errors[0].tab, verifyErrors: errors }); // errors[0].tab or 'login'
    return rv;
}
