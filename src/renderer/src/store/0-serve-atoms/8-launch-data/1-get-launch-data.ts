import { FormIdx, tmurl, urlDomain } from "@/store/8-manifest";
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

    const loginDomain = login.url ? urlDomain(login.url) : ''; // This is visaonline.com
    const loginHost = login.url ? new URL(login.url).hostname : ''; // This is gvol.visaonline.com

    return {
        login,
        cpass,
        loginDomain,
        loginHost,
    };
}
