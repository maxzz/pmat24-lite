export namespace password {

    export enum POLICYTYPE {
        none,
        verify,				// TODO: describe
        generate,			// TODO: describe
    };

    export enum CHARSETTYPE {
        alphanumeric,		// TODO: describe
        alpha,				// TODO: describe
        numeric,			// TODO: describe
        withspecial,		// TODO: describe
        atleastonenumber,	// TODO: describe
    };

    export enum RESTRICTTYPE {
        no_restrictions,    // Nothing specified.
        different_wp,       // Different from window password.
        different_ap,       // Different from any password.
        different_pp,       // Different from previous password.
    };

    export const POLICY_SEPARATOR = "#expo#"; // "EXtended POlicy". keep the length less then 8.
    export const TOKEN_PREVENT_CHARACTERREPEAT = "~";
    export const TOKEN_PREVENT_CHARACTERPOSITION = "&";

    export type polycy_t = {
        type: POLICYTYPE,           // This is for simple and complex policy.
        constrains: RESTRICTTYPE,   // This is for simple and complex policy.
        simpleChSet: CHARSETTYPE,   // This is for simple policy only.
        minLength: number,        // This is for simple and complex policy.
        maxLength: number,      // This is for simple and complex policy.

        useExt: boolean,        // Is extended policy in effective now?
        policyExt: string,    // Extended policy string.
    };

    // Constructor from #### policyFromString ####
    export function constructorFromString(v_: string, type: POLICYTYPE = POLICYTYPE.none): polycy_t {
        const rv = {
            type,
        } as polycy_t;

        const {policyOld: policySimple, policyExt} = compatibility_split_policy(v_);

        policyFromStringSimple(policySimple, rv);
        policyFromStringExtended(policyExt, rv);

        return rv;
    }


     export function policyToStringSimple(policy: polycy_t): string {

        let strType = '';
        switch (policy.type) {
            case POLICYTYPE.none: return '';
            case POLICYTYPE.verify: strType = "[p4]v:"; break;
            case POLICYTYPE.generate: strType = "[p4]g:"; break;
        }

        const rv = `${strType}:${policy.minLength}:${policy.maxLength}:${charsetcastToString(policy.simpleChSet)}:${conv_constrains_tTostring(policy.constrains)}`;
        return rv;
    }

    export function  policyToString(policy: polycy_t): string {
        let rvSimple = policyToStringSimple(policy);
        let rvExt = policyToStringExtended(policy);

        let rv = '';
        compatibility_combine_policy(rv, rvSimple, rvExt);
        return rv;
    }


    function compatibility_split_policy(policy_: string): { policyOld?: string | undefined; policyExt?: string | undefined; } {
        // 0. Split policy_ in policyOld_ and policyNew_ to save as manifest fields: 'policy' and 'policy2'.
        // This call is for manifest_io, and for policy string parsing.

        const rv: {
            policyOld?: string,
            policyExt?: string,
        } = {};

        const arr = policy_.split(POLICY_SEPARATOR);
        for (const part of arr) {
            if (part.startsWith("[p4]")) { // policy with 4 elements.
                rv.policyOld = part;
            }
            else if (part.startsWith("[e1]")) { // policy extension version 1.
                rv.policyExt = part;
            }
        }

        return rv;
    }

    function compatibility_combine_policy(policy_: string, policyOld_: string, policyExt_: string): string {
        // 0. Combine policyOld_ and policyNew_ policies into policy_ after manifest was loaded.
        // This call is for manifest_io only.

        if (!!policyOld_) {
            if (!policy_)
                policy_ = policyOld_;
            else
                policy_ = policyOld_ + POLICY_SEPARATOR + policy_;
        }

        if (!!policyExt_) {
            if (!policy_)
                policy_ = policyExt_;
            else
                policy_ = policy_ + POLICY_SEPARATOR + policyExt_;
        }

        return policy_;
    }

    function policyFromStringSimple(v_: string | undefined, rv: Partial<polycy_t>) { // initial rv is {}
        if (!v_) {
            return;
        }

        const ss = v_.split(":");

        if (ss.length != 5) {
            return;
        }

        if (ss[0] === "[p4]v") {
            rv.type = POLICYTYPE.verify;
        }
        else if (ss[0] === "[p4]g") {
            rv.type = POLICYTYPE.generate;
        }
        else {
            return;
        }

        rv.minLength = +ss[1];
        rv.maxLength = +ss[2];
        rv.simpleChSet = charsetcast(ss[3]);
        rv.constrains = conv_constrains_t(ss[4]);
    }

    function policyFromStringExtended(v_: string | undefined, rv: Partial<polycy_t>) { // initial rv is {}
        rv.useExt = false;
        rv.policyExt = '';

        if (!v_ || v_.length < 4)
            return;

        let v: string = v_;

        let policyPF: string = v.substring(0, 6);

        if (policyPF === "[e1]v:")
            rv.type = POLICYTYPE.verify;
        else if (policyPF === "[e1]g:")
            rv.type = POLICYTYPE.generate;
        else {
            rv.type = POLICYTYPE.none;
            return;
        }

        v = v.substring(6);

        rv.useExt = true;
        rv.policyExt = v;

        const parts = getExtendedParts(v, rv.minLength || 0, rv.maxLength || 0);
        rv = { ...rv, ...parts };
    }

    function policyToStringExtended(v: Partial<polycy_t>): string {
        let rv: string = '';

        if (v.useExt) {
            switch (v.type) {
                case POLICYTYPE.none:
                    return rv;
                case POLICYTYPE.verify:
                    rv = "[e1]v:";
                    break;
                case POLICYTYPE.generate:
                    rv = "[e1]g:";
                    break;
            }
        }

        rv = `${rv}${v.policyExt}<${v.minLength},${v.maxLength}>`; // rv += sformat("%s<%d,%d>", m_policyExt, m_minLength, m_maxLength);
        return rv;
    }


    function charsetcast(v_: string): CHARSETTYPE {
        let rv: CHARSETTYPE;
        if (!v_)
            rv = CHARSETTYPE.alphanumeric;
        else if (v_ === "alpha")
            rv = CHARSETTYPE.alpha;
        else if (v_ === "numeric")
            rv = CHARSETTYPE.numeric;
        else if (v_ === "withspecial")
            rv = CHARSETTYPE.withspecial;
        else if (v_ === "atleastonenumber")
            rv = CHARSETTYPE.atleastonenumber;
        else
            rv = CHARSETTYPE.alphanumeric;
        return rv;
    }

    function charsetcastToString(v_: CHARSETTYPE): string {
        let rv: string = '';
        switch (v_) {
            case CHARSETTYPE.alphanumeric:
            default: break;
            case CHARSETTYPE.alpha: rv = "alpha"; break;
            case CHARSETTYPE.numeric: rv = "numeric"; break;
            case CHARSETTYPE.withspecial: rv = "withspecial"; break;
            case CHARSETTYPE.atleastonenumber: rv = "atleastonenumber"; break;
        }
        return rv;
    }

    function conv_constrains_t(v_: string): RESTRICTTYPE {
        let rv: RESTRICTTYPE;
        if (!v_)
            rv = RESTRICTTYPE.no_restrictions;
        else if (v_ === "different_wp")
            rv = RESTRICTTYPE.different_wp;
        else if (v_ === "different_ap")
            rv = RESTRICTTYPE.different_ap;
        else if (v_ === "different_pp")
            rv = RESTRICTTYPE.different_pp; else rv = RESTRICTTYPE.no_restrictions;
        return rv;
    }

    function conv_constrains_tTostring(v_: RESTRICTTYPE): string {
        let rv: string = '';
        switch (v_) {
            case RESTRICTTYPE.no_restrictions:
            default: break;
            case RESTRICTTYPE.different_wp: rv = "different_wp"; break;
            case RESTRICTTYPE.different_ap: rv = "different_ap"; break;
            case RESTRICTTYPE.different_pp: rv = "different_pp"; break;
        }
        return rv;
    }

    function getExtendedParts(v_: string, minlength_: number, maxlength_: number) {
        const rv: {
            patternPart_: string;
            minlength_: number;
            maxlength_: number;
        } = {
            patternPart_: '',
            minlength_,
            maxlength_,
        };

        if (!v_) {
            return rv;
        }

        const beginpos = v_.lastIndexOf('<');
        if (beginpos === -1) {
            rv.patternPart_ = v_;
            return rv;
        }

        const endpos = v_.indexOf('>', beginpos);
        if (endpos === -1) {
            rv.patternPart_ = v_;
            return rv;
        }

        let minmaxvalue = v_.substring(beginpos + 1, endpos - beginpos - 1);
        if (!minmaxvalue) {
            rv.patternPart_ = v_;
            return;
        }


        const values = minmaxvalue.split(',');

        if (values.length !== 2) {
            rv.patternPart_ = v_;
            return;
        }

        rv.patternPart_ = v_.substring(0, beginpos) + v_.substring(endpos + 1);
        rv.minlength_ = +values[0];
        rv.maxlength_ = +values[1];
    }


}
