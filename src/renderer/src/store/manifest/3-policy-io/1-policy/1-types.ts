export enum POLICYTYPE {
    none,
    verify,				        // TODO: describe
    generate,			        // TODO: describe
};

export enum CHARSETTYPE {
    alphanumeric,		        // alphabetic and numeric
    alpha,				        // alphabetic
    numeric,			        // numeric
    withspecial,		        // alphabetic, numeric and special characters
    atleastonenumber,	        // alphabetic, numeric and special characters with at least one number
};

export enum RESTRICTTYPE {
    no_restrictions,            // Nothing specified.
    different_wp,               // Different from window password.
    different_ap,               // Different from any password.
    different_pp,               // Different from previous password.
};

export type PolicyIo = {
    type: POLICYTYPE,           // Type of policy
    
    constrains: RESTRICTTYPE,   // Password repetition constrains
    minLength: number,          // min length of password
    maxLength: number,          // max length of password

    simpleChSet: CHARSETTYPE,   // This is for simple policy only

    useExt: boolean,            // Is extended policy in effective now?
    policyExt: string,          // Extended policy string
};

// default policy

const defaultPolicy: PolicyIo = {
    type: POLICYTYPE.none,
    simpleChSet: CHARSETTYPE.atleastonenumber,
    constrains: RESTRICTTYPE.no_restrictions,
    minLength: 0,
    maxLength: 0,
    useExt: false,
    policyExt: '',
};

export function defaultPolicyByType(type: POLICYTYPE): PolicyIo {
    const rv = { ...defaultPolicy, type, constrains: RESTRICTTYPE.different_ap };
    switch (type) {
        case POLICYTYPE.none:
            break;
        case POLICYTYPE.verify:
            rv.minLength = 8;
            rv.maxLength = 32;
            break;
        case POLICYTYPE.generate:
            rv.minLength = 16;
            rv.maxLength = 16;
            break;
    }
    return rv;
}
