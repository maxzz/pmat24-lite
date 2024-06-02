import { Poli } from "pm-manifest";

// export enum POLICYTYPE {
//     none,
//     verify,                     // TODO: describe
//     generate,                   // TODO: describe
// };

// export enum CHARSETTYPE {
//     alphanumeric,               // alphabetic and numeric
//     alpha,                      // alphabetic
//     numeric,                    // numeric
//     withspecial,                // alphabetic, numeric and special characters
//     atleastonenumber,           // alphabetic, numeric and special characters with at least one number
// };

// export enum RESTRICTTYPE {
//     no_restrictions,            // Nothing specified.
//     different_wp,               // Different from Windows password.
//     different_ap,               // Different from any password.
//     different_pp,               // Different from previous password.
// };

export type PolicyIo = {
    type: Poli.UseAs,               // Type of policy
    
    simpleChSet: Poli.ConstrainSet, // This is for simple policy only
    minLength: number,              // min length of password
    maxLength: number,              // max length of password
    
    constrains: Poli.ConstrainPsw,  // Password repetition constrains

    useExt: boolean,                // Is extended policy in effective now?
    policyExt: string,              // Extended policy string
};

// default policy

const defaultPolicy: PolicyIo = {
    type: Poli.UseAs.none,
    simpleChSet: Poli.ConstrainSet.atleastonenumber,
    constrains: Poli.ConstrainPsw.none,
    minLength: 0,
    maxLength: 0,
    useExt: false,
    policyExt: '',
};

export function defaultPolicyByType(type: Poli.UseAs): PolicyIo {
    const rv = { ...defaultPolicy, type, constrains: Poli.ConstrainPsw.diffAp };
    switch (type) {
        case Poli.UseAs.none:
            break;
        case Poli.UseAs.verify:
            rv.minLength = 8;
            rv.maxLength = 32;
            break;
        case Poli.UseAs.generate:
            rv.minLength = 16;
            rv.maxLength = 16;
            break;
    }
    return rv;
}
