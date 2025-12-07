import { FormIdx } from "pm-manifest";
import { type ManiAtoms } from "@/store/2-file-mani-atoms";
import { type LaunchDataAll, type LaunchData } from "./9-launch-types";

export function getLaunchData(maniAtoms: ManiAtoms, get: Getter): LaunchDataAll {
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
