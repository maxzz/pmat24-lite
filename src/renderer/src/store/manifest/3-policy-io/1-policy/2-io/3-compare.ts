import { PolicyIo } from "../1-types";

export function theSame(a: PolicyIo, b: PolicyIo): boolean {
    const rv =
        a.type === b.type &&
        a.constrains === b.constrains &&
        a.simpleChSet === b.simpleChSet &&
        a.minLength === b.minLength &&
        a.maxLength === b.maxLength &&
        a.useExt === b.useExt &&
        a.policyExt === b.policyExt;
    return rv;
}
