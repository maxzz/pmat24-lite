import { atom } from "jotai";
import { type PolicyDlgTypes } from "../0-conv";
import { generatePswByRules } from "@/store/8-manifest/3-policy-io";
import { doVerifyPswAtom } from "./2-do-verify-psw";

export const doGeneratePswAtom = atom(
    null,
    (get, set, { dlgUiCtx, prevPsw = '' }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; prevPsw?: string; }) => {
        const { parser, customAtom, errorTextAtom, testPasswordAtom } = dlgUiCtx;

        const custom = get(customAtom);
        if (!custom) {
            set(errorTextAtom, 'The custom rule is empty');
            return;
        }

        const psw = generatePswByRules(parser.rulesAndMeta, parser.rulesAndMeta.noRepeat, prevPsw);
        set(testPasswordAtom, psw);

        set(doVerifyPswAtom, { dlgUiCtx, psw, prevPsw });
    }
);
