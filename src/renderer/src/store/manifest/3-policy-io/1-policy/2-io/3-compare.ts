import { PolicyIo } from "../1-types";

export function theSame(a: PolicyIo, b: PolicyIo): boolean {
    const rv =
        a.useAs === b.useAs &&
        a.constrainPsw === b.constrainPsw &&
        a.constrainSet === b.constrainSet &&
        a.minLen === b.minLen &&
        a.maxLen === b.maxLen &&
        a.useExt === b.useExt &&
        a.custom === b.custom;
    return rv;
}
