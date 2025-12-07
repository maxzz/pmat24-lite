import { atom } from "jotai";
import { type ManiAtoms } from "@/store/2-file-mani-atoms/9-types";
import { FormIdx } from "@/store/8-manifest";

export type LaunchData = {
    url: string | undefined;
    exe: string | undefined;
    isWeb: boolean;
};

export type LaunchDataMain = {
    login: LaunchData;
    cpass: LaunchData;
};

export const launchDataAtom = atom(
    null,
    (get, set, { maniAtoms }: { maniAtoms: ManiAtoms }): LaunchDataMain => {
        const loginFormCtx = maniAtoms[FormIdx.login];
        const cpassFormCtx = maniAtoms[FormIdx.cpass];

        let login: LaunchData = { url: undefined, exe: undefined, isWeb: false };
        let cpass: LaunchData = { url: undefined, exe: undefined, isWeb: false };

        if (loginFormCtx) {
            login.url = get(loginFormCtx.options.p2Detect.ourlAtom).data;
            login.exe = get(loginFormCtx.options.p2Detect.processnameAtom).data;
            login.isWeb = get(loginFormCtx.options.isWebAtom);
            
        }

        if (cpassFormCtx) {
            cpass.url = get(cpassFormCtx.options.p2Detect.ourlAtom).data;
            cpass.exe = get(cpassFormCtx.options.p2Detect.processnameAtom).data;
            cpass.isWeb = get(cpassFormCtx.options.isWebAtom);
        }

        return {
            login,
            cpass,
        };
    }
);
