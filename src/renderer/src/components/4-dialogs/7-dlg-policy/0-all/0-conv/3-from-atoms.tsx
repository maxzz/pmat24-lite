import { type PolicyDlgTypes } from "./9-types";

export function fromAtoms(ctx: PolicyDlgTypes.PolicyUiCtx, { get }: GetOnly): PolicyDlgTypes.ForAtoms {
    const rv: PolicyDlgTypes.ForAtoms = {
        enabled: get(ctx.enabledAtom),
        constrainSet: get(ctx.constrainSetAtom),
        constrainSet0: get(ctx.constrainSet0Atom),
        isCustom: get(ctx.isCustomAtom),
        custom: get(ctx.customAtom),
        minLen: get(ctx.minLenAtom),
        maxLen: get(ctx.maxLenAtom),
        explanation: get(ctx.explanationAtom),
        errorText: get(ctx.errorTextAtom),
        testPassword: get(ctx.testPasswordAtom),
        testVerified: get(ctx.testVerifiedAtom),
        constrainPsw: get(ctx.constrainPswAtom),
        useAs: get(ctx.useAsAtom),
        fakeOptions: get(ctx.fakeOptionsAtom),
    };
    return rv;
}
