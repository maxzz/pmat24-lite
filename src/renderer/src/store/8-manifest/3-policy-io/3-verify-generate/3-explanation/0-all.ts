import { Poli } from "@/store/manifest";
import { parseExtPolicy2RulesSet } from "../../3-parser";
import { RulesAndMeta } from "../../3-parser/1-parser-types";
import { getCustomRuleExplanation } from "./3-custom-rule-explanation";
import { getSimpleExplanation } from "./4-simple-rule-explanation";
import { stringsPolicy } from "./9-strings";

function getCustomRuleAndLenExplanation(rulesAndMeta: RulesAndMeta, noDuplicates: boolean, final: string[]): void {
    let ruleLength = stringsPolicy.chSetLen(rulesAndMeta.targetMin, rulesAndMeta.targetMax);//ai:`Length must be between ${rulesSet_.m_pswlenSet.m_min} and ${rulesSet_.m_pswlenSet.m_max} characters.\n`;
    final.push('\n' + ruleLength); // IDS_PSW_POLICY_HEAD	+ ruleLength;

    if (noDuplicates) {
        final.push(stringsPolicy.noRepeat());//ai:'Each password character must only be used one time.';
    }

    getCustomRuleExplanation(rulesAndMeta.rules, final);
}

export function getPolicyExplanation(policy: Poli.Policy, final: string[]): void {

    if (policy.custom) {
        const parseAdvPolicyResult = parseExtPolicy2RulesSet(policy);

        // Explanation is shown only for verification hence we allow duplication of characters within a 
        let noduplicate = false;
        getCustomRuleAndLenExplanation(parseAdvPolicyResult.rulesAndMeta, noduplicate, final);
    } else {
        getSimpleExplanation(policy, final);
    }
}
