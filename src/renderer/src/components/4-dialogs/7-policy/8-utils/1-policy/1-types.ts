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

export type Policy = {
    type: POLICYTYPE,           // Type of policy
    constrains: RESTRICTTYPE,   // Password repetition constrains
    minLength: number,          // min length of password
    maxLength: number,          // max length of password

    simpleChSet: CHARSETTYPE,   // This is for simple policy only

    useExt: boolean,            // Is extended policy in effective now?
    policyExt: string,          // Extended policy string
};

// casting

export function str_charset(v: string): CHARSETTYPE {
    let rv: CHARSETTYPE;
    if (!v)
        rv = CHARSETTYPE.alphanumeric;
    else if (v === "alpha")
        rv = CHARSETTYPE.alpha;
    else if (v === "numeric")
        rv = CHARSETTYPE.numeric;
    else if (v === "withspecial")
        rv = CHARSETTYPE.withspecial;
    else if (v === "atleastonenumber")
        rv = CHARSETTYPE.atleastonenumber;
    else
        rv = CHARSETTYPE.alphanumeric;
    return rv;
}

export function charset_str(v: CHARSETTYPE): string {
    let rv: string = '';
    switch (v) {
        case CHARSETTYPE.alphanumeric:
        default: break;
        case CHARSETTYPE.alpha: rv = "alpha"; break;
        case CHARSETTYPE.numeric: rv = "numeric"; break;
        case CHARSETTYPE.withspecial: rv = "withspecial"; break;
        case CHARSETTYPE.atleastonenumber: rv = "atleastonenumber"; break;
    }
    return rv;
}

export function str_constrains(v: string): RESTRICTTYPE {
    let rv: RESTRICTTYPE;
    if (!v)
        rv = RESTRICTTYPE.no_restrictions;
    else if (v === "different_wp")
        rv = RESTRICTTYPE.different_wp;
    else if (v === "different_ap")
        rv = RESTRICTTYPE.different_ap;
    else if (v === "different_pp")
        rv = RESTRICTTYPE.different_pp; else rv = RESTRICTTYPE.no_restrictions;
    return rv;
}

export function constrains_str(v: RESTRICTTYPE): string {
    let rv: string = '';
    switch (v) {
        case RESTRICTTYPE.no_restrictions:
        default: break;
        case RESTRICTTYPE.different_wp: rv = "different_wp"; break;
        case RESTRICTTYPE.different_ap: rv = "different_ap"; break;
        case RESTRICTTYPE.different_pp: rv = "different_pp"; break;
    }
    return rv;
}

// default policy

export const defaultPolicy: Policy = {
    type: POLICYTYPE.none,
    constrains: RESTRICTTYPE.no_restrictions,
    simpleChSet: CHARSETTYPE.alphanumeric,
    minLength: 0,
    maxLength: 0,
    useExt: false,
    policyExt: '',
};

// Default policy constructor #### defaultpolicy ####
export function defaultPolicyByType(type: POLICYTYPE): Policy {
    const rv = { ...defaultPolicy };

    rv.simpleChSet = CHARSETTYPE.withspecial;
    rv.constrains = RESTRICTTYPE.different_ap;

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
