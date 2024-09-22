import { atom } from "jotai";
import { type PolicyDlgTypes } from "../0-conv";
import { parserErrorToString } from "@/store/manifest/3-policy-io";
import { checkRulesBoundsForGenerate, getCustomRuleExplanation } from "@/store/manifest/3-policy-io";
import { verifyAtom } from "./2-verify-psw";
import { checkBoundsRange, checkMinMax } from "./8-check-fns";

export const updateExplanationAtom = atom(null,
    (get, set, { dlgUiAtoms, custom }: { dlgUiAtoms: PolicyDlgTypes.PolicyUiAtoms; custom?: string | undefined; }) => {
        const { customAtom, parser, minLenAtom, maxLenAtom, explanationAtom, errorTextAtom, testVerifiedAtom } = dlgUiAtoms;
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

            set(verifyAtom, { dlgUiAtoms });

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
