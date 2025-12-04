import { type Mani, Poli, policyToStrings } from "@/store/8-manifest";
import { type PolicyDlgTypes } from "./9-types";

// Back to manifest

export function forMani(from: PolicyDlgTypes.ForAtoms): Mani.FieldPolicy {

    const useAs = !from.enabled
        ? Poli.UseAs.none
        : from.useAs === '0'
            ? Poli.UseAs.none
            : from.useAs === '1'
                ? Poli.UseAs.verify
                : Poli.UseAs.generate;

    const constrainSet: Poli.ConstrainSet = from.isCustom ? +from.constrainSet0 : +from.constrainSet;
    const constrainPsw: Poli.ConstrainPsw = +from.constrainPsw;

    const policy: Poli.Policy = {
        useAs,
        minLen: +from.minLen.data,
        maxLen: +from.maxLen.data,
        constrainSet,
        constrainPsw,
        custom: from.custom,
    };

    const rv: Mani.FieldPolicy = policyToStrings(policy, from.fakeOptions);
    return rv;
}
