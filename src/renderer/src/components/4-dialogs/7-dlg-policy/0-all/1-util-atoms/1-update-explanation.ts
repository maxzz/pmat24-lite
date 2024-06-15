import { atom } from "jotai";
import { PolicyDlgConv } from "../0-conv";
import { parserErrorToString } from "@/store/manifest/3-policy-io";
import { checkRulesBoundsForGenerate, getCustomRuleExplanation } from "@/store/manifest/3-policy-io";
import { verifyAtom } from ".";

function checkMinMax({ min, max }: { min: number; max: number; }): string | undefined {
    if (isNaN(min)) {
        return 'Min password length is not a number';
    }

    if (isNaN(max)) {
        return 'Max password length is not a number';
    }

    if (min < 1) {
        return 'Min password length cannot be less than 1';
    }

    if (max < min) {
        return 'Max password length is less than min password length';
    }
}

function checkBoundsRange({ min, max, totalMin, totalMax }: { min: number; max: number; totalMin: number; totalMax: number; }): string | undefined {
    // Check if custom rule generates lenght can be inside defined total password length and show error if not
    if (min > totalMin) {
        return `The custom rule can generate ${totalMin} characters, but minimum required is ${min}`;
    }

    if (max < totalMax) {
        return `The custom rule can generate ${totalMax} characters, but maximun required is ${max}`;
    }
}

export const updateExplanationAtom = atom(null,
    (get, set, { dlgUiAtoms, custom }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; custom?: string | undefined; }) => {
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
