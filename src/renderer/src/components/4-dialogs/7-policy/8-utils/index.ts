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

    type polycy_t = {
        type: POLICYTYPE,           // This is for simple and complex policy.
        constrains: RESTRICTTYPE,   // This is for simple and complex policy.
        simpleChSet: CHARSETTYPE,   // This is for simple policy only.
        minLength: number,        // This is for simple and complex policy.
        maxLength: number,      // This is for simple and complex policy.

        useExt: boolean,        // Is extended policy in effective now?
        policyExt: string,    // Extended policy string.
    };

    function policyFromStringSimple(v_: string) {
        if (!v_)
            return;

        const ss = v_.split(":");

        if (ss.length != 5)
            return;

        const rv: Partial<polycy_t> = {};

        if (ss[0] === "[p4]v") {
            rv.type = POLICYTYPE.verify;
        }
        else if (ss[0] == "[p4]g") {
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
    /*
        void policyFromStringExtended(__in const string_t& v_) {
            m_useExt = false;
            m_policyExt.clear();
    
            if (v_.empty() || v_.length() < 4)
                return;
    
            string_t v = v_;
    
            string_t policyPF = v.substr(0, 6);
            if (policyPF == "[e1]v:")
                m_type = POLICYTYPE:: verify;
            else if (policyPF == "[e1]g:")
                m_type = POLICYTYPE:: generate;
            else {
                m_type = POLICYTYPE:: none;
                return;
            }
    
            v.replace(0, 6, "");
    
            m_useExt = true;
            m_policyExt = v;
    
            getExtendedParts(v, m_policyExt, m_minLength, m_maxLength);
        } // policyFromStringExtended()
    
        string_t policyToStringExtended() const {
            string_t rv;
        if (m_useExt) {
            switch (m_type) {
                case POLICYTYPE:: none:
                    return rv;
                case POLICYTYPE:: verify:
                    rv = "[e1]v:";
                    break;
                case POLICYTYPE:: generate:
                    rv = "[e1]g:";
                    break;
            }
        }
        rv += sformat("%s<%d,%d>", m_policyExt, m_minLength, m_maxLength);
        return rv;
    }
    */





    function charsetcast(v_: string): CHARSETTYPE {
        let rv: CHARSETTYPE;
        if (!v_)
            rv = CHARSETTYPE.alphanumeric;
        else if (v_ == "alpha")
            rv = CHARSETTYPE.alpha;
        else if (v_ == "numeric")
            rv = CHARSETTYPE.numeric;
        else if (v_ == "withspecial")
            rv = CHARSETTYPE.withspecial;
        else if (v_ == "atleastonenumber")
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
        else if (v_ == "different_wp")
            rv = RESTRICTTYPE.different_wp;
        else if (v_ == "different_ap")
            rv = RESTRICTTYPE.different_ap;
        else if (v_ == "different_pp")
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



}
