import { ChSet, RulesAndMeta } from "../../../3-parser/1-parser-types";
import { ChSetExtra } from "../9-types";
import { GenerateByRuleParams, generateByRule } from "./4-generate-by-rule";
import { GeneratePswByRulesRecursivelyParams, splitToDefUndef } from "./2-split-to-def-undef";
import { spreadFinalLength } from "./3-spread-final-length";

export function generatePasswordByRuleNoThrow(rulesAndMeta: RulesAndMeta, noDuplicates: boolean, prevPsw: string): string {
    let rv = '';

    try {
        let pm: GeneratePswByRulesRecursivelyParams = {
            chSetExtraMap: new Map<ChSet, ChSetExtra>(),
            generated: [],
            toGenerate: [],
            pswLenGenerated: 0,
            pswLenFixedCount: 0,
        };
        splitToDefUndef(rulesAndMeta.rules, pm);

        pm.pswLenGenerated = spreadFinalLength(pm.toGenerate, pm.pswLenGenerated, rulesAndMeta.targetMin, rulesAndMeta.targetMax);

        let excludeChars = '';
        if (rulesAndMeta.noPrevPos) { // Check previous password character by character if requested
            excludeChars = prevPsw;
        }

        const generateByRuleParams: GenerateByRuleParams = {
            rules: rulesAndMeta.rules,
            chSetExtraMap: pm.chSetExtraMap,
            noDuplicates,
            avoidConsecutiveChars: rulesAndMeta.noRepeat,
            excludeChars,
        }
        rv = generateByRule(generateByRuleParams);

    } catch (e) {
        rv = '';
        console.log('Error in generatePasswordByRuleNoThrow: ', e);
    }

    return rv;
}
