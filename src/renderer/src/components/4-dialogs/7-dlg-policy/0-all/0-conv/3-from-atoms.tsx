import { type Getter, type Setter } from "jotai";
import { type PolicyDlgTypes } from "./9-types";

export function fromAtoms(atoms: PolicyDlgTypes.PolicyUiAtoms, get: Getter, set: Setter): PolicyDlgTypes.ForAtoms {
    const rv: PolicyDlgTypes.ForAtoms = {
        enabled: get(atoms.enabledAtom),
        constrainSet: get(atoms.constrainSetAtom),
        constrainSet0: get(atoms.constrainSet0Atom),
        isCustom: get(atoms.isCustomAtom),
        custom: get(atoms.customAtom),
        minLen: get(atoms.minLenAtom),
        maxLen: get(atoms.maxLenAtom),
        explanation: get(atoms.explanationAtom),
        errorText: get(atoms.errorTextAtom),
        testPassword: get(atoms.testPasswordAtom),
        testVerified: get(atoms.testVerifiedAtom),
        constrainPsw: get(atoms.constrainPswAtom),
        useAs: get(atoms.useAsAtom),
        fakeOptions: get(atoms.fakeOptionsAtom),
    };
    return rv;
}
