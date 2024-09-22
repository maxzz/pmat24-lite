import { atom } from "jotai";
import { type PolicyDlgTypes } from "../0-conv";
import { generatePswByRules } from "@/store/manifest/3-policy-io";
import { verifyAtom } from "./2-verify-psw";

export const generateAtom = atom(null,
    (get, set, { dlgUiCtx, prevPsw = '' }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; prevPsw?: string; }) => {
        const { parser, customAtom, errorTextAtom, testPasswordAtom } = dlgUiCtx;

        const custom = get(customAtom);
        if (!custom) {
            set(errorTextAtom, 'The custom rule is empty');
            return;
        }

        const psw = generatePswByRules(parser.rulesAndMeta, parser.rulesAndMeta.noRepeat, prevPsw);
        set(testPasswordAtom, psw);

        set(verifyAtom, { dlgUiCtx: dlgUiCtx, psw, prevPsw });
    }
);
