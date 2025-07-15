import { type Atomize, type OnValueChangeAny, atomWithCallback } from "@/utils";
import { PolicyDlgTypes } from "./9-types";

export function createAtoms(initialState: PolicyDlgTypes.ForAtoms, onChange: OnValueChangeAny): Atomize<PolicyDlgTypes.ForAtoms> {
    const { enabled, constrainSet, custom, minLen, maxLen, explanation, testPassword, testVerified, constrainPsw, useAs } = initialState;
    const rv: Atomize<PolicyDlgTypes.ForAtoms> = {
        enabledAtom: atomWithCallback(enabled, onChange),
        constrainSetAtom: atomWithCallback(constrainSet, onChange),
        constrainSet0Atom: atomWithCallback(constrainSet, onChange),
        isCustomAtom: atomWithCallback(initialState.isCustom, onChange),
        customAtom: atomWithCallback(custom, onChange),
        minLenAtom: atomWithCallback(minLen, onChange),
        maxLenAtom: atomWithCallback(maxLen, onChange),
        explanationAtom: atomWithCallback(explanation, onChange),
        errorTextAtom: atomWithCallback(initialState.errorText, onChange),
        testPasswordAtom: atomWithCallback(testPassword, onChange),
        testVerifiedAtom: atomWithCallback(testVerified, onChange),
        constrainPswAtom: atomWithCallback(constrainPsw, onChange),
        useAsAtom: atomWithCallback(useAs, onChange),
        fakeOptionsAtom: atomWithCallback(initialState.fakeOptions, onChange),
    };
    return rv;
}
