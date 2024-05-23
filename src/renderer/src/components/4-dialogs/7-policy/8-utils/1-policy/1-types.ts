export enum POLICYTYPE {
    none,
    verify,				        // TODO: describe
    generate,			        // TODO: describe
};

export enum CHARSETTYPE {
    alphanumeric,		        // TODO: describe
    alpha,				        // TODO: describe
    numeric,			        // TODO: describe
    withspecial,		        // TODO: describe
    atleastonenumber,	        // TODO: describe
};

export enum RESTRICTTYPE {
    no_restrictions,            // Nothing specified.
    different_wp,               // Different from window password.
    different_ap,               // Different from any password.
    different_pp,               // Different from previous password.
};

export type Policy = {
    type: POLICYTYPE,           // This is for simple and complex policy.
    constrains: RESTRICTTYPE,   // This is for simple and complex policy.
    simpleChSet: CHARSETTYPE,   // This is for simple policy only.
    minLength: number,          // This is for simple and complex policy.
    maxLength: number,          // This is for simple and complex policy.

    useExt: boolean,            // Is extended policy in effective now?
    policyExt: string,          // Extended policy string.
};
