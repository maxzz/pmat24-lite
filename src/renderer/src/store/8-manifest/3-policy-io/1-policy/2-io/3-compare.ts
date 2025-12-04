import { type Poli } from "@/store/8-manifest";

export function theSame(a: Poli.Policy, b: Poli.Policy): boolean {
    const rv =
        a.useAs === b.useAs &&
        a.constrainPsw === b.constrainPsw &&
        a.constrainSet === b.constrainSet &&
        a.minLen === b.minLen &&
        a.maxLen === b.maxLen &&
        a.custom === b.custom;
    return rv;
}
