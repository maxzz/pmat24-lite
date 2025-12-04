import { Rule } from "../../../3-parser/1-parser-types";
import { ChSetExtraMap } from "../9-types";
import { genUtils } from "../../9-gen-utils";
import { findChSetData } from "./1-find-chset-data";

export type GenerateByRuleParams = {
    rules: Rule[];
    chSetExtraMap: ChSetExtraMap;
    noDuplicates: boolean;
    avoidConsecutiveChars: boolean;
    excludeChars: string;
};

export function generateByRule(params: GenerateByRuleParams): string {
    let rv_password = '';

    const { rules, chSetExtraMap, noDuplicates, avoidConsecutiveChars, excludeChars } = params;

    rules.forEach((rule) => {

        if (rule.isGroup) {

            let pswOutOfGroup = generateByRule({
                ...params,
                rules: rule.group.rules,
            });

            if (rule.group.mix) {
                pswOutOfGroup = genUtils.randomizeCharsInString(pswOutOfGroup);
            }

            rv_password += pswOutOfGroup;

            if (avoidConsecutiveChars) {

                let newPsw = '';
                let prevCh: string | undefined;

                for (let i = 0; i < rv_password.length; i++) {
                    let curCh = rv_password[i];

                    if (prevCh === curCh) {
                        let chSetData = findChSetData(curCh, chSetExtraMap, rule.group.rules);
                        if (chSetData) {
                            let newExcludeChars = (i === rv_password.length - 1 ? prevCh : prevCh + rv_password[i + 1]) + excludeChars;
                            let generatedValue = genUtils.genPswPartByChars(chSetData.chSet.chars, newExcludeChars, 1);

                            curCh = !generatedValue ? curCh : generatedValue[0]; // i.e. replace with generated value if any.
                        }
                    }

                    newPsw += curCh;
                    prevCh = curCh;
                }

                rv_password = newPsw;
            }

        } else {
            const chSetExtra = chSetExtraMap.get(rule.chSet);
            if (!chSetExtra) {
                throw new Error("no.chSetExtra.1");
            }

            const newExcludeChars = (noDuplicates ? rv_password : '') + excludeChars;

            if (chSetExtra.generatedLen > 0) { // SM: Fix for Bug 88016:PMAT password change create/edit regex pw gen returns rule error only some fraction on uses
                rv_password += chSetExtra.generateValue(newExcludeChars);
            }

            if (avoidConsecutiveChars) {
                let newPsw = '';
                let prevCh: string | undefined;

                for (let i = 0; i < rv_password.length; i++) {
                    let curCh = rv_password[i];

                    if (prevCh === curCh) {
                        let newExcludeChars = (i === rv_password.length - 1 ? prevCh : prevCh + rv_password[i + 1]) + excludeChars;
                        let generatedValue = genUtils.genPswPartByChars(chSetExtra.chSet.chars, newExcludeChars, 1);

                        curCh = !generatedValue ? curCh : generatedValue[0]; // i.e. replace with generated value if any.
                    }

                    newPsw += curCh;
                    prevCh = curCh;
                }

                rv_password = newPsw;
            }
        }
    });

    return rv_password;
}
