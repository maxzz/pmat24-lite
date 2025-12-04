import { atom } from "jotai";
import { type PolicyDlgTypes } from "../0-conv";
import { parserErrorToString } from "@/store/8-manifest/3-policy-io";
import { checkRulesBoundsForGenerate, getCustomRuleExplanation } from "@/store/8-manifest/3-policy-io";
import { doVerifyPswAtom } from "./2-do-verify-psw";
import { checkBoundsRange, checkMinMax } from "./8-utility-check-fns";

export const doUpdateExplanationAtom = atom(
    null,
    (get, set, { dlgUiCtx, custom }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; custom?: string | undefined; }) => {
        const { customAtom, parser, minLenAtom, maxLenAtom, explanationAtom, errorTextAtom, testVerifiedAtom } = dlgUiCtx;
        try {
            set(testVerifiedAtom, '');

            if (custom === undefined) {
                custom = get(customAtom);
            }

            const range = { min: +get(minLenAtom).data, max: +get(maxLenAtom).data };
            const errorRange = checkMinMax(range);
            if (errorRange) {
                set(errorTextAtom, errorRange);
                return;
            }

            const { min, max } = range;

            parser.doParse({ custom, minTotal: min, maxTotal: max });

            const final = [];
            getCustomRuleExplanation(parser.rulesAndMeta.rules, final);
            const explanation = final.join('\n');
            set(explanationAtom, explanation);

            set(doVerifyPswAtom, { dlgUiCtx: dlgUiCtx });

            if (custom) {
                const bounds = checkRulesBoundsForGenerate(parser.rulesAndMeta);
                const errorBounds = checkBoundsRange({ min, max, totalMin: bounds.totalMin, totalMax: bounds.totalMax });
                if (errorBounds) {
                    set(errorTextAtom, errorBounds);
                    return;
                }
            }

            set(errorTextAtom, '');
        } catch (e) {
            set(errorTextAtom, parserErrorToString(e));
            set(testVerifiedAtom, '');
        }
    }
);
