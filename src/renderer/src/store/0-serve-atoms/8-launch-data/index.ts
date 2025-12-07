import { atom } from "jotai";
import { type ManiAtoms } from "@/store/2-file-mani-atoms/9-types";
import { FormIdx } from "@/store/8-manifest";

export type LaunchDataForm = {
    url?: string;
    exe?: string;
    isWeb: boolean;
};

export type LaunchData = {
    login: LaunchDataForm;
    cpass: LaunchDataForm;
};

export const launchDataAtom = atom(
    null,
    (get, set, { maniAtoms }: { maniAtoms: ManiAtoms }): LaunchData => {
        const loginFormCtx = maniAtoms[FormIdx.login];
        const cpassFormCtx = maniAtoms[FormIdx.cpass];

        let login: {
            url?: string;
            exe?: string;
            isWeb: boolean;
        } = {
            url: undefined,
            exe: undefined,
            isWeb: false,
        };
        let cpass: {
            url?: string;
            exe?: string;
            isWeb: boolean;
        } = {
            url: undefined,
            exe: undefined,
            isWeb: false,
        };

        if (loginFormCtx) {
            login.url = get(loginFormCtx.options.p2Detect.murlAtom).data;
            login.exe = get(loginFormCtx.options.p2Detect.processnameAtom).data;
            login.isWeb = get(loginFormCtx.options.isWebAtom);
            
        }

        if (cpassFormCtx) {
            cpass.url = get(cpassFormCtx.options.p2Detect.murlAtom).data;
            cpass.exe = get(cpassFormCtx.options.p2Detect.processnameAtom).data;
            cpass.isWeb = get(cpassFormCtx.options.isWebAtom);
        }

        return {
            login,
            cpass,
        };
    }
);
