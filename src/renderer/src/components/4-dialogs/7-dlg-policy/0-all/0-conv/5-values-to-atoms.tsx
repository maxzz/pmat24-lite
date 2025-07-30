import { type PolicyDlgTypes } from "./9-types";

export function valuesToAtoms(values: PolicyDlgTypes.ForAtoms, atoms: PolicyDlgTypes.ForAtomsAtomized, { set }: SetOnly): void {
    set(atoms.enabledAtom, values.enabled);
    set(atoms.constrainSetAtom, values.constrainSet);
    set(atoms.constrainSet0Atom, values.constrainSet0);
    set(atoms.isCustomAtom, values.isCustom);
    set(atoms.customAtom, values.custom);
    set(atoms.minLenAtom, values.minLen);
    set(atoms.maxLenAtom, values.maxLen);
    set(atoms.explanationAtom, values.explanation);
    set(atoms.errorTextAtom, values.errorText);
    set(atoms.testPasswordAtom, values.testPassword);
    set(atoms.testVerifiedAtom, values.testVerified);
    set(atoms.constrainPswAtom, values.constrainPsw);
    set(atoms.useAsAtom, values.useAs);
    set(atoms.fakeOptionsAtom, values.fakeOptions);
}
