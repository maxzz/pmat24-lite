import { ChSet, RulesAndMeta, Rule } from "../../3-parser";

type GetBoundsRecursivelyResult = {
    undefs: ChSet[]; // undefined character set entries i.e. rule entries without any max bound value.
    min: number; // entries min total
    max: number; // entries max total
};

function getBoundsRecursively(rules: Rule[], rv: GetBoundsRecursivelyResult): void {
    rules.forEach(
        (rule) => {
            if (rule.isGroup) {
                getBoundsRecursively(rule.group.rules, rv);
            } else {
                const minRange = rule.chSet.range.min;
                const maxRange = rule.chSet.range.max;

                // We have min and max range set -1 if the pattern has placeholders.
                // In that case, we have to set the range to 1 only.
                if (minRange === -1 && maxRange === -1) {
                    rv.min++;
                    rv.max++;
                    return;
                }

                if (minRange > 0) {
                    rv.min += minRange;
                }

                if (maxRange > 0) {
                    rv.max += maxRange;
                } else if (maxRange === -2) {
                    // Add to the list of undefined rule entries.
                    // If we are here then the max range is not set for the current entry.
                    rv.max += minRange; // Add min range to max total (at least).
                    rv.undefs.push(rule.chSet);
                }
            }
        }
    );
}

type CheckRulesBoundsForGenerateResult = {
    isMinValid: boolean;
    isMaxValid: boolean;
};

export function checkRulesBoundsForGenerate(rulesAndMeta: RulesAndMeta): CheckRulesBoundsForGenerateResult {

    // Initialize return values with the assumption that the min and max values are valid.
    const rv: CheckRulesBoundsForGenerateResult = {
        isMinValid: true,
        isMaxValid: true,
    };

    // To get min and max bounds.
    var pm: GetBoundsRecursivelyResult = {
        undefs: [],
        min: 0,
        max: 0,
    };
    getBoundsRecursively(rulesAndMeta.rules, pm);

    if (pm.min < rulesAndMeta.pswLenRange.min) {
        // Determine whether there are any Rule entries without max value to accommodate missing places.
        let maxCharactersAvailable = pm.undefs.reduce((acc, cur) => acc + cur.chars.length, pm.min);
        rv.isMinValid = maxCharactersAvailable > rulesAndMeta.pswLenRange.min;
    } else if (pm.min > rulesAndMeta.pswLenRange.max) {
        rv.isMinValid = false;
    }

    if (pm.max < rulesAndMeta.pswLenRange.min) {
        // Determine whether there are any Rule entries without max value to accommodate missing places.
        let maxCharactersAvailable = pm.undefs.reduce((acc, cur) => acc + cur.chars.length, pm.max);
        rv.isMaxValid = maxCharactersAvailable > rulesAndMeta.pswLenRange.min;
    } else if (pm.max > rulesAndMeta.pswLenRange.max) {
        rv.isMaxValid = false;
    }

    return rv;
}
