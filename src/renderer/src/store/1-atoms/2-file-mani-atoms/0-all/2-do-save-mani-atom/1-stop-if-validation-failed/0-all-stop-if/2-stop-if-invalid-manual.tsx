import { type Getter, type Setter } from "jotai";
import { type ManiAtoms } from "../../../../9-types";
import { doVerifyManualFormAtom } from "../1-do-verify-atoms";
import { showValidationErrors } from "./4-show-validation-errors";

export function stopIfInvalidManual(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    
    const errors = set(doVerifyManualFormAtom, { maniAtoms });

    const rv = showValidationErrors({ fromTab: errors?.[0].tab, verifyErrors: errors }); // errors[0].tab or 'login'
    return rv;
}

//TODO: validation: activate row
//TODO: validation: activate initial row
