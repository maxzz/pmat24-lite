import { CHARSETTYPE, RESTRICTTYPE } from "./1-types";

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
