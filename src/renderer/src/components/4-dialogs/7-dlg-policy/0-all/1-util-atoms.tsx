import { Getter, Setter, atom } from "jotai";
import { PolicyDlgConv } from "./0-conv";
import { ParseError } from "@/store/manifest/3-policy-io";
import { checkRulesBoundsForGenerate, generatePasswordByRuleNoThrow, getCustomRuleExplanation, verifyPasswordAgainstRuleNoThrow } from "@/store/manifest/3-policy-io";

export const doInitialAtomsSetupAtom = atom(null,
    (get, set, { dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) => {
        const custom = get(dlgUiAtoms.customAtom);
        set(updateExplanationAtom, { dlgUiAtoms, custom });
    }
);

export const updateMinMaxAtom = atom(null,
    (get, set, { dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) => {
        //updateMinMaxFromUi(get, set, dlgUiAtoms);

        const custom = get(dlgUiAtoms.customAtom);
        set(updateExplanationAtom, { dlgUiAtoms, custom });
    }
);

//<8,20>
//A{2,5}d{1,}[!@#$%^&*._]{1,}a{2,5}<8,20>
//Is Invalid but why?
//RBD6*vf1
//RBD6*vfA
//Is valid but why?
//RBD6*vfn

//d{8,} and <8,20> generates only 8-10 characters

//TODO: when isCustom assume initial values are correct
//TODO: length may be missing from custom rule

function updateMinMaxFromUi(get: Getter, set: Setter, dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms) {
    const { parser, minLenAtom, maxLenAtom } = dlgUiAtoms;

    const min = +get(minLenAtom).data;
    const max = +get(maxLenAtom).data;

    // parser.rulesAndMeta.finalMin = min;
    // parser.rulesAndMeta.finalMax = max;

    if (parser.rulesAndMeta.targetMin === -1) {
        parser.rulesAndMeta.targetMin = min;
    }

    if (parser.rulesAndMeta.targetMax === -1) {
        parser.rulesAndMeta.targetMax = max;
    }
}

function checkMinMax(get: Getter, set: Setter, dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms) {
    const { parser, minLenAtom, maxLenAtom, customAtom, explanationAtom, errorTextAtom, testVerifiedAtom } = dlgUiAtoms;
    const min = +get(minLenAtom).data;
    const max = +get(maxLenAtom).data;

    if (min < 1) {
        set(errorTextAtom, 'Min password length is less than 1.');
        return;
    }

    if (max < min) {
        set(errorTextAtom, 'Max password length is less than min password length.');
        return;
    }

    if (parser.rulesAndMeta.targetMin === -1) {
        set(errorTextAtom, 'Min password length is not specified.');
        return;
    }

    if (parser.rulesAndMeta.targetMax === -1) {
        set(errorTextAtom, 'Max password length is not specified.');
        return;
    }

    if (parser.rulesAndMeta.targetMin < min) {
        set(errorTextAtom, 'Min password length is less than the minimum password length specified in the custom rule.');
        return;
    }

    if (parser.rulesAndMeta.targetMax > max) {
        set(errorTextAtom, 'Max password length is less than the maximum password length specified in the custom rule.');
        return;
    }

    set(errorTextAtom, '');
}

export const updateExplanationAtom = atom(null,
    (get, set, { dlgUiAtoms, custom }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; custom: string; }) => {
        const { parser, minLenAtom, maxLenAtom, explanationAtom, errorTextAtom, testPasswordAtom, testVerifiedAtom } = dlgUiAtoms;
        try {
            const min = +get(minLenAtom).data;
            const max = +get(maxLenAtom).data;

            set(testVerifiedAtom, '');

            if (isNaN(min)) {
                set(errorTextAtom, 'Min password length is not a number.');
                return;
            }

            if (isNaN(max)) {
                set(errorTextAtom, 'Max password length is not a number.');
                return;
            }

            if (min < 1) {
                set(errorTextAtom, 'Min password length is less than 1.');
                return;
            }

            if (max < min) {
                set(errorTextAtom, 'Max password length is less than min password length.');
                return;
            }

            if (parser.rulesAndMeta.targetMin === -1) {
                parser.rulesAndMeta.targetMin = min;
            }

            if (parser.rulesAndMeta.targetMax === -1) {
                parser.rulesAndMeta.targetMax = max;
            }

            // if (parser.rulesAndMeta.finalMin === -1) {
            //     set(errorTextAtom, 'Min password length is not specified.');
            //     return;
            // }

            // if (parser.rulesAndMeta.finalMax === -1) {
            //     set(errorTextAtom, 'Max password length is not specified.');
            //     return;
            // }

            parser.doParse({custom, minTotal: min, maxTotal: max});

            //updateMinMaxFromUi(get, set, dlgUiAtoms); // set conditionally min and max from ui if not set in custom rule

            console.log(`updateExplanation "${custom}<${min},${max}>"`, parser.rulesAndMeta);

            if (custom) {
                const bounds = checkRulesBoundsForGenerate(parser.rulesAndMeta);
                console.log(`bounds=${JSON.stringify(bounds)} ${custom}`);

                if (bounds.totalMin < min) {
                    set(errorTextAtom, `The custom rule generates less than ${min} characters.`);
                    return;
                }

                if (bounds.totalMax > max) {
                    set(errorTextAtom, `The custom rule generates more than ${max} characters.`);
                    return;
                }
            }

            //if ()

            const final = [];
            getCustomRuleExplanation(parser.rulesAndMeta.rules, final);
            const explanation = final.join('\n');

            set(explanationAtom, explanation);
            set(errorTextAtom, '');

            const testPassword = get(testPasswordAtom);
            set(verifyAtom, { dlgUiAtoms, psw: testPassword, prevPsw: '' });
        } catch (e) {
            const msg =
                e instanceof ParseError
                    ? `${e.what} at position ${e.pos}`
                    : e instanceof Error
                        ? e.message
                        : `${e}`;
            set(errorTextAtom, msg);
            set(testVerifiedAtom, '');
            //console.error(e);
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

        //updateMinMaxFromUi(get, set, dlgUiAtoms);

        console.log(`generateAtom custom=${custom}`, parser);

        const psw = generatePasswordByRuleNoThrow(parser.rulesAndMeta, parser.rulesAndMeta.avoidConsecutiveChars, prevPsw);
        set(testPasswordAtom, psw);
        set(verifyAtom, { dlgUiAtoms, psw, prevPsw });
        //console.log(`generateAtom ok=${ok} newPsw=${newPsw}`);
    }
);

export const verifyAtom = atom(null,
    (get, set, { dlgUiAtoms, psw, prevPsw }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; psw: string; prevPsw: string; }) => {
        const { parser, testVerifiedAtom } = dlgUiAtoms;

        //updateMinMaxFromUi(get, set, dlgUiAtoms);

        console.log(`verify`, parser.rulesAndMeta);
        

        const ok = verifyPasswordAgainstRuleNoThrow(parser.rulesAndMeta, prevPsw, psw, parser.rulesAndMeta.avoidConsecutiveChars);
        set(testVerifiedAtom, ok ? '1' : '0');
    }
);
