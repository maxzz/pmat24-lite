import { Poli } from "@/store/8-manifest";
import { stringsPolicy, stringsPolicy3 } from "./9-strings";
import { genUtils } from "../9-gen-utils";

export function getSimpleExplanation(policy: Poli.Policy, final: string[]): void {
    let ruleLength = stringsPolicy.chSetLen(policy.minLen, policy.maxLen); //ai:`Length must be between ${policy_.minLength} and ${policy_.maxLength} characters.\n`;
    final.push('\n' + ruleLength); // IDS_PSW_POLICY_HEAD	+ ruleLength;

    //if (policy.noDuplicate) { rv += keyvalues_[IDS_PSW_POLICY_NOREPEAT]; }
    let rv = '';

    switch (policy.constrainSet) {
        case Poli.ConstrainSet.alphanumeric:
            rv = stringsPolicy.chSet(genUtils.SET_AlphaLower);
            rv = stringsPolicy.chSet(genUtils.SET_AlphaUpper);
            rv = stringsPolicy.chSet(genUtils.SET_Numeric);
            break;
        case Poli.ConstrainSet.alpha:
            rv = stringsPolicy.chSet(genUtils.SET_AlphaLower);
            rv = stringsPolicy.chSet(genUtils.SET_AlphaUpper);
            break;
        case Poli.ConstrainSet.numeric:
            rv = stringsPolicy.chSet(genUtils.SET_Numeric);
            break;
        case Poli.ConstrainSet.withspecial:
            rv = stringsPolicy.chSet(genUtils.SET_AlphaLower);
            rv = stringsPolicy.chSet(genUtils.SET_AlphaUpper);
            rv = stringsPolicy.chSet(genUtils.SET_Numeric);
            rv = stringsPolicy.chSet(genUtils.SET_Special);
            break;
        case Poli.ConstrainSet.atleastonenumber:
            rv = stringsPolicy.chSetMin(1, genUtils.SET_Numeric);
            rv = stringsPolicy.chSet(genUtils.SET_AlphaLower);
            rv = stringsPolicy.chSet(genUtils.SET_AlphaUpper);
            break;
        //default: Do nothing.
    }
    final.push(rv);

    switch (policy.constrainPsw) {
        case Poli.ConstrainPsw.diffAp:
            rv = stringsPolicy3.diffAp;
            break;
        case Poli.ConstrainPsw.diffPp:
            rv = stringsPolicy3.diffPp;
            break;
        case Poli.ConstrainPsw.diffWp:
            rv = stringsPolicy3.diffWp;
            break;
        case Poli.ConstrainPsw.none: // No explanation.

        //default: break;
    }
    final.push(rv);
}
