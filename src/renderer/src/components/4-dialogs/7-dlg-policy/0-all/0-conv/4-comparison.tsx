import { type PolicyDlgTypes } from "./9-types";

export function areTheSame(from: PolicyDlgTypes.ForAtoms, to: PolicyDlgTypes.ForAtoms): boolean {
    const rv = (
        from.enabled === to.enabled &&
        from.constrainSet === to.constrainSet &&
        from.custom === to.custom &&
        from.minLen.data === to.minLen.data &&
        from.maxLen.data === to.maxLen.data &&
        from.constrainPsw === to.constrainPsw &&
        from.useAs === to.useAs &&
        from.fakeOptions === to.fakeOptions
    );
    return rv;
}
