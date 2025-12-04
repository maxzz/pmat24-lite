import { Poli } from "@/store/8-manifest";

export function str_charset(v: string): Poli.ConstrainSet {
    let rv: Poli.ConstrainSet;
    if (!v)
        rv = Poli.ConstrainSet.alphanumeric;
    else if (v === "alpha")
        rv = Poli.ConstrainSet.alpha;
    else if (v === "numeric")
        rv = Poli.ConstrainSet.numeric;
    else if (v === "withspecial")
        rv = Poli.ConstrainSet.withspecial;
    else if (v === "atleastonenumber")
        rv = Poli.ConstrainSet.atleastonenumber;
    else
        rv = Poli.ConstrainSet.alphanumeric;
    return rv;
}

export function charset_str(v: Poli.ConstrainSet): string {
    let rv: string = '';
    switch (v) {
        case Poli.ConstrainSet.alphanumeric:
        default: break;
        case Poli.ConstrainSet.alpha: rv = "alpha"; break;
        case Poli.ConstrainSet.numeric: rv = "numeric"; break;
        case Poli.ConstrainSet.withspecial: rv = "withspecial"; break;
        case Poli.ConstrainSet.atleastonenumber: rv = "atleastonenumber"; break;
    }
    return rv;
}

export function str_constrains(v: string): Poli.ConstrainPsw {
    let rv: Poli.ConstrainPsw;
    if (!v)
        rv = Poli.ConstrainPsw.none;
    else if (v === "different_wp")
        rv = Poli.ConstrainPsw.diffWp;
    else if (v === "different_ap")
        rv = Poli.ConstrainPsw.diffAp;
    else if (v === "different_pp")
        rv = Poli.ConstrainPsw.diffPp; else rv = Poli.ConstrainPsw.none;
    return rv;
}

export function constrains_str(v: Poli.ConstrainPsw): string {
    let rv: string = '';
    switch (v) {
        case Poli.ConstrainPsw.none:
        default: break;
        case Poli.ConstrainPsw.diffWp: rv = "different_wp"; break;
        case Poli.ConstrainPsw.diffAp: rv = "different_ap"; break;
        case Poli.ConstrainPsw.diffPp: rv = "different_pp"; break;
    }
    return rv;
}
