import { atom } from "jotai";
import { type PolicyDlgTypes } from "../0-conv";
import { verifyPassword } from "@/store/8-manifest/3-policy-io";

export const doVerifyPswAtom = atom(
    null,
    (get, set, { dlgUiCtx, psw, prevPsw = '' }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; psw?: string | undefined; prevPsw?: string; }) => {
        const { parser, testPasswordAtom, testVerifiedAtom } = dlgUiCtx;

        if (psw === undefined) {
            psw = get(testPasswordAtom);
        }

        const ok = verifyPassword(parser.rulesAndMeta, prevPsw, psw, parser.rulesAndMeta.noRepeat);
        set(testVerifiedAtom, ok ? '1' : '0');
    }
);
