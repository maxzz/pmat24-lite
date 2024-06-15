import { ChSet, RulesAndMeta, Rule } from "../../../3-parser/1-parser-types";

type GetBoundsRecursivelyResult = {
    openRanges: ChSet[];    // undefined character set entries i.e. rule entries without any max bound value.
    totalMin: number;       // entries min total
    totalMax: number;       // entries max total
    hasUndef: boolean;      // has rules with undefined max range
};

function getBoundsRecursively(rules: Rule[], rv: GetBoundsRecursivelyResult): void {
    rules.forEach(
        (rule) => {
            if (rule.isGroup) {
                getBoundsRecursively(rule.group.rules, rv);
            } else {
                const ruleMin = rule.chSet.min;
                const ruleMax = rule.chSet.max;

                // We have min and max range set -1 if the pattern has placeholders.
                // In that case, we have to set the range to 1 only.
                if (ruleMin === -1 && ruleMax === -1) {
                    rv.totalMin++;
                    rv.totalMax++;
                    return;
                }

                if (ruleMax === -2) {
                    rv.hasUndef = true;
                }

                if (ruleMin > 0) {
                    rv.totalMin += ruleMin;
                }

                if (ruleMax > 0) {
                    rv.totalMax += ruleMax;
                }
                else if (ruleMax === -2) {
                    // Add to the list of rule with undefined max range.
                    // If we are here then the max range is not set for the current entry.
                    rv.totalMax += ruleMin; // Add min range to max total (at least).
                    rv.openRanges.push(rule.chSet);
                }
            }
        }
    );
}

type CheckRulesBoundsForGenerateResult = GetBoundsRecursivelyResult & {
    isMinValid: boolean;
    isMaxValid: boolean;
    minAvailableChars: number;
    maxAvailableChars: number;
    hasUndef: boolean;      // has rules with undefined max range
};

export function checkRulesBoundsForGenerate(rulesAndMeta: RulesAndMeta): CheckRulesBoundsForGenerateResult {

    // To get min and max bounds.
    var all: GetBoundsRecursivelyResult = {
        openRanges: [],
        totalMin: 0,
        totalMax: 0,
        hasUndef: false,
    };
    getBoundsRecursively(rulesAndMeta.rules, all);

    // Initialize return values with the assumption that the min and max values are valid.
    const rv: CheckRulesBoundsForGenerateResult = {
        isMinValid: true,
        isMaxValid: true,
        minAvailableChars: -1,
        maxAvailableChars: -1,
        ...all,
    };

    if (all.totalMin < rulesAndMeta.targetMin) {
        // Determine whether there are any Rule entries without max value to accommodate missing places.
        rv.minAvailableChars = all.openRanges.reduce((acc, cur) => acc + cur.chars.length, all.totalMin);
        rv.isMinValid = rv.minAvailableChars > rulesAndMeta.targetMin;
    }
    else if (all.totalMin > rulesAndMeta.targetMax) {
        rv.isMinValid = false;
    }

    if (all.totalMax < rulesAndMeta.targetMin) {
        // Determine whether there are any Rule entries without max value to accommodate missing places.
        rv.maxAvailableChars = all.openRanges.reduce((acc, cur) => acc + cur.chars.length, all.totalMax);
        rv.isMaxValid = rv.maxAvailableChars > rulesAndMeta.targetMin;
    }
    else if (all.totalMax > rulesAndMeta.targetMax) {
        rv.isMaxValid = false;
    }

    return rv;
}
