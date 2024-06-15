import { atom } from "jotai";
import { PolicyDlgConv } from "../0-conv";
import { generatePswByRules } from "@/store/manifest/3-policy-io";
import { verifyAtom } from "./2-verify-psw";

export const generateAtom = atom(null,
    (get, set, { dlgUiAtoms, prevPsw }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; prevPsw: string; }) => {
        const { parser, customAtom, errorTextAtom, testPasswordAtom } = dlgUiAtoms;

        const custom = get(customAtom);
        if (!custom) {
            set(errorTextAtom, 'The custom rule is empty');
            return;
        }

        const psw = generatePswByRules(parser.rulesAndMeta, parser.rulesAndMeta.noRepeat, prevPsw);
        set(testPasswordAtom, psw);

        set(verifyAtom, { dlgUiAtoms, psw, prevPsw });
    }
);
