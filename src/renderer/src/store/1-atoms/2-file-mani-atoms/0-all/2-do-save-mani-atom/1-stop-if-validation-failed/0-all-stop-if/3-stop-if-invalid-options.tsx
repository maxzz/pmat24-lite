import { type Getter, type Setter } from "jotai";
import { type ManiAtoms } from "../../../../9-types";
import { doVerifyOptionsAtom } from "../1-do-verify-atoms";
import { showValidationErrors } from "./4-show-validation-errors";

export function stopIfInvalidOptions(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {

    const errors = set(doVerifyOptionsAtom, { maniAtoms });

    const rv = showValidationErrors({ fromTab: 'options', verifyErrors: errors });
    return rv;
}

//TODO: validation: activate row (balloon)
