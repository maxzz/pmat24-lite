import { Getter, Setter, atom } from "jotai";
import { PolicyDlgConv } from "./0-conv";
import { parserErrorToString } from "@/store/manifest/3-policy-io";
import { checkRulesBoundsForGenerate, generatePswByRules, getCustomRuleExplanation, verifyPassword } from "@/store/manifest/3-policy-io";

export const doInitialAtomsSetupAtom = atom(null,
    (get, set, { dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) => {
        const custom = get(dlgUiAtoms.customAtom);
        set(updateExplanationAtom, { dlgUiAtoms, custom });
    }
);

export const updateMinMaxAtom = atom(null,
    (get, set, { dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) => {
        const custom = get(dlgUiAtoms.customAtom);
        set(updateExplanationAtom, { dlgUiAtoms, custom });
    }
);

function updateMinMaxFromUi(get: Getter, set: Setter, dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms) {
    const { parser, minLenAtom, maxLenAtom } = dlgUiAtoms;

    const min = +get(minLenAtom).data;
    const max = +get(maxLenAtom).data;

    if (parser.rulesAndMeta.targetMin === -1) {
        parser.rulesAndMeta.targetMin = min;
    }

    if (parser.rulesAndMeta.targetMax === -1) {
        parser.rulesAndMeta.targetMax = max;
    }
}

function checkMinMax({ min, max }: { min: number, max: number; }): string | undefined {
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

export const updateExplanationAtom = atom(null,
    (get, set, { dlgUiAtoms, custom }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; custom: string; }) => {
        const { parser, minLenAtom, maxLenAtom, explanationAtom, errorTextAtom, testPasswordAtom, testVerifiedAtom } = dlgUiAtoms;
        try {
            set(testVerifiedAtom, '');

            const range = {min: +get(minLenAtom).data, max: +get(maxLenAtom).data};
            const error = checkMinMax(range);
            if (error) {
                set(errorTextAtom, error);
                return;
            }

            const {min, max} = range;

            parser.doParse({ custom, minTotal: min, maxTotal: max });

            if (custom) {
                const bounds = checkRulesBoundsForGenerate(parser.rulesAndMeta);
                console.log(`bounds=${JSON.stringify(bounds)} ${custom}`);

                if (bounds.totalMin < min) {
                    set(errorTextAtom, `The custom rule can generate ${bounds.totalMin} characters, but minimum required is ${min}`);
                    return;
                }

                if (bounds.totalMax > max) {
                    set(errorTextAtom, `The custom rule can generate ${bounds.totalMax} characters, but maximun required is ${max}`);
                    return;
                }
            }

            const final = [];
            getCustomRuleExplanation(parser.rulesAndMeta.rules, final);
            const explanation = final.join('\n');

            set(explanationAtom, explanation);
            set(errorTextAtom, '');
            set(verifyAtom, { dlgUiAtoms, psw: get(testPasswordAtom), prevPsw: '' });
        } catch (e) {
            set(errorTextAtom, parserErrorToString(e));
            set(testVerifiedAtom, '');
        }
    }
);

export const generateAtom = atom(null,
    (get, set, { dlgUiAtoms, prevPsw }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; prevPsw: string; }) => {
        const { parser, customAtom, errorTextAtom, testPasswordAtom } = dlgUiAtoms;

        const custom = get(customAtom);
        if (!custom) {
            set(errorTextAtom, 'The custom rule is empty.');
            return;
        }

        //TODO: check if custom rule generates lenght can be inside defined total passowd length and show error if not
        console.log(`generateAtom custom=${custom}`, parser);

        const psw = generatePswByRules(parser.rulesAndMeta, parser.rulesAndMeta.noRepeat, prevPsw);
        set(testPasswordAtom, psw);
        set(verifyAtom, { dlgUiAtoms, psw, prevPsw });
    }
);

export const verifyAtom = atom(null,
    (get, set, { dlgUiAtoms, psw, prevPsw }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; psw: string; prevPsw: string; }) => {
        const { parser, testVerifiedAtom } = dlgUiAtoms;
        const ok = verifyPassword(parser.rulesAndMeta, prevPsw, psw, parser.rulesAndMeta.noRepeat);
        set(testVerifiedAtom, ok ? '1' : '0');
    }
);
