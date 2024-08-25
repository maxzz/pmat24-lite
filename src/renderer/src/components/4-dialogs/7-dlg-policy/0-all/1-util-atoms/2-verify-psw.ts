import { atom } from "jotai";
import { type PolicyDlgTypes } from "../0-conv";
import { verifyPassword } from "@/store/manifest/3-policy-io";

export const verifyAtom = atom(null,
    (get, set, { dlgUiAtoms, psw, prevPsw = '' }: { dlgUiAtoms: PolicyDlgTypes.PolicyUiAtoms; psw?: string | undefined; prevPsw?: string; }) => {
        const { parser, testPasswordAtom, testVerifiedAtom } = dlgUiAtoms;

        if (psw === undefined) {
            psw = get(testPasswordAtom);
        }

        const ok = verifyPassword(parser.rulesAndMeta, prevPsw, psw, parser.rulesAndMeta.noRepeat);
        set(testVerifiedAtom, ok ? '1' : '0');
    }
);
