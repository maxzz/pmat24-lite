import { atom } from "jotai";
import { PolicyDlgConv } from "./0-conv";
import { ParseError } from "@/store/manifest/3-policy-io/3-parser";
import { getCustomRuleExplanation } from "@/store/manifest/3-policy-io/3-verify-generate/3-explanation/4-policy-explanation";
import { generatePasswordByRuleNoThrow } from "@/store/manifest/3-policy-io/3-verify-generate/4-low-level/2-generate-password-by-rule-no-throw";
import { verifyPasswordAgainstRuleNoThrow } from "@/store/manifest/3-policy-io/3-verify-generate/4-low-level/1-verify-password-against-rule-no-throw";

export const doInitialAtomsSetupAtom = atom(null,
    (get, set, { dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) => {
        const custom = get(dlgUiAtoms.customAtom);
        set(updateExplanationAtom, { dlgUiAtoms, psw: custom });
    }
);

//<8,20>

//A{2,5}d{1,}[!@#$%^&*._]{1,}a{2,5}<8,20>
//Is Invalid but why?
//RBD6*vf1
//RBD6*vfA
//Is valid but why?
//RBD6*vfn

export const updateExplanationAtom = atom(null,
    (_get, set, { dlgUiAtoms, psw }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; psw: string; }) => {
        const { parser, explanationAtom, errorTextAtom, testVerifiedAtom } = dlgUiAtoms;
        try {
            parser.sourceText = psw;
            parser.doParse();

            if (parser.rulesAndMeta.pswLenRange.min === -1) {
                set(errorTextAtom, 'Min password length is not specified.');
                return;
            }

            if (parser.rulesAndMeta.pswLenRange.max === -1) {
                set(errorTextAtom, 'Max password length is not specified.');
                return;
            }

            const final = [];
            getCustomRuleExplanation(parser.rulesAndMeta.rules, final);
            const explanation = final.join('\n');

            set(explanationAtom, explanation);
            set(errorTextAtom, '');
            set(verifyAtom, { dlgUiAtoms, psw: psw, prevPsw: '' });
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
    (_get, set, { dlgUiAtoms, prevPsw }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; prevPsw: string; }) => {
        const { parser, testPasswordAtom } = dlgUiAtoms;
        const psw = generatePasswordByRuleNoThrow(parser.rulesAndMeta, parser.rulesAndMeta.avoidConsecutiveChars, prevPsw);
        set(testPasswordAtom, psw);
        set(verifyAtom, { dlgUiAtoms, psw, prevPsw });
        //console.log(`generateAtom ok=${ok} newPsw=${newPsw}`);
    }
);

export const verifyAtom = atom(null,
    (_get, set, { dlgUiAtoms, psw, prevPsw }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; psw: string; prevPsw: string; }) => {
        const { parser, testVerifiedAtom } = dlgUiAtoms;
        const ok = verifyPasswordAgainstRuleNoThrow(parser.rulesAndMeta, prevPsw, psw, parser.rulesAndMeta.avoidConsecutiveChars);
        set(testVerifiedAtom, ok ? '1' : '0');
    }
);
