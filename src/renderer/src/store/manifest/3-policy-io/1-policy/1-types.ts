import { Poli } from "pm-manifest";

export type PolicyIo = {
    useAs: Poli.UseAs,                  // Type of policy
    constrainSet: Poli.ConstrainSet,    // This is for simple policy only
    constrainPsw: Poli.ConstrainPsw,    // Password repetition constrains
    minLen: number,                     // min length of password
    maxLen: number,                     // max length of password
    useExt: boolean,                    // Is extended policy in effective now?
    custom: string,                     // Extended policy string
};

// default policy

const defaultPolicy: PolicyIo = {
    useAs: Poli.UseAs.none,
    constrainSet: Poli.ConstrainSet.atleastonenumber,
    constrainPsw: Poli.ConstrainPsw.none,
    minLen: 0,
    maxLen: 0,
    useExt: false,
    custom: '',
};

export function defaultPolicyByType(type: Poli.UseAs): PolicyIo {
    const rv = { ...defaultPolicy, type, constrains: Poli.ConstrainPsw.diffAp };
    switch (type) {
        case Poli.UseAs.none:
            break;
        case Poli.UseAs.verify:
            rv.minLen = 8;
            rv.maxLen = 32;
            break;
        case Poli.UseAs.generate:
            rv.minLen = 16;
            rv.maxLen = 16;
            break;
    }
    return rv;
}
