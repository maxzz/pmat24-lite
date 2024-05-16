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

    
    export function compatibility_split_policy(policy_: string): { policyOld?: string | undefined; policyExt?: string | undefined; }  {
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

    export function compatibility_combine_policy(policy_: string, policyOld_: string, policyExt_: string): string {
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

}
