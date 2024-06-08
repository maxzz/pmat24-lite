import { atom } from "jotai";
import { PolicyDlgConv } from "./0-conv";
import { ParseError } from "@/store/manifest/3-policy-io/3-parser";
import { getCustomRuleExplanation } from "@/store/manifest/3-policy-io/3-verify-generate/3-explanation/4-policy-explanation";

export const UpdateExplanationAtom = atom(null,
    (_get, set, { dlgUiAtoms, value }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; value: string; }) => {
        const { parser, explanationAtom, errorTextAtom } = dlgUiAtoms;
        try {
            parser.sourceText = value;
            parser.doParse();

            const final = [];
            getCustomRuleExplanation(parser.rulesAndMeta.rules, final);
            const explanation = final.join('\n');

            set(explanationAtom, explanation);
            set(errorTextAtom, '');
        } catch (e) {
            const msg =
                e instanceof Error
                    ? e.message
                    : e instanceof ParseError
                        ? `${e.what} at position ${e.pos}`
                        : `${e}`;
            // set(explanationAtom, (prev) => prev + '\nError\n' + msg);
            set(errorTextAtom, msg);
            console.error(e);
        }
    }
);
