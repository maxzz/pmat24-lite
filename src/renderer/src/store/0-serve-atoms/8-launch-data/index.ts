import { atom } from "jotai";
import { type ManiAtoms } from "@/store/2-file-mani-atoms/9-types";
import { FormIdx } from "@/store/8-manifest";

export type LaunchData = {
    loginUrl?: string;
    cpassUrl?: string;
    loginExe?: string;
    cpassExe?: string;
    isWeb: boolean;
};

export const launchDataAtom = atom(
    null,
    (get, set, { maniAtoms }: { maniAtoms: ManiAtoms }): LaunchData => {
        const loginFormCtx = maniAtoms[FormIdx.login];
        const cpassFormCtx = maniAtoms[FormIdx.cpass];

        let loginUrl: string | undefined;
        let cpassUrl: string | undefined;
        let loginExe: string | undefined;
        let cpassExe: string | undefined;
        let isWeb: boolean = false;

        if (loginFormCtx) {
            loginUrl = get(loginFormCtx.options.p2Detect.murlAtom).data;
            loginExe = get(loginFormCtx.options.p2Detect.processnameAtom).data;
            
            isWeb = get(loginFormCtx.options.isWebAtom);
        }

        if (cpassFormCtx) {
            cpassUrl = get(cpassFormCtx.options.p2Detect.murlAtom).data;
            cpassExe = get(cpassFormCtx.options.p2Detect.processnameAtom).data;
        }

        return {
            loginUrl,
            cpassUrl,
            loginExe,
            cpassExe,
            isWeb,
        };
    }
);
