import { ChSet, RulesAndMeta } from "../../../3-parser/1-parser-types";
import { ChSetExtra } from "../9-types";
import { GenerateByRuleParams, generateByRule } from "./4-generate-by-rule";
import { GeneratePswByRulesRecursivelyParams, splitToDefUndef } from "./2-split-to-def-undef";
import { spreadLenForUndefs } from "./3-spread-final-length";

export function generatePswByRules(rulesAndMeta: RulesAndMeta, noDuplicates: boolean, prevPsw: string): string {
    try {
        let pm: GeneratePswByRulesRecursivelyParams = {
            chSetExtraMap: new Map<ChSet, ChSetExtra>(),
            generated: [],
            toGenerate: [],
            pswLenGenerated: 0,
            pswLenFixedCount: 0,
        };
        splitToDefUndef(rulesAndMeta.rules, pm);

        pm.pswLenGenerated = spreadLenForUndefs(pm.toGenerate, pm.pswLenGenerated, rulesAndMeta.targetMin, rulesAndMeta.targetMax);

        const generateByRuleParams: GenerateByRuleParams = {
            rules: rulesAndMeta.rules,
            chSetExtraMap: pm.chSetExtraMap,
            noDuplicates,
            avoidConsecutiveChars: rulesAndMeta.noRepeat,
            excludeChars: rulesAndMeta.noPrevPos ? prevPsw : '', // Check previous password character by character if requested
        };
        const rv = generateByRule(generateByRuleParams);
        return rv;
    } catch (e) {
        console.error('generatePswByRule', e);
        return '';
    }
}
