import { type Getter } from "jotai";
import { FormIdx, tmurl, urlDomain } from "@/store/8-manifest";
import { type ManiAtoms } from "@/store/2-file-mani-atoms";
import { type LaunchDataAll, type LaunchData } from "./9-launch-types";
import { expandEnvVariablesWindows } from "./2-process-env-atom";

export function getLaunchData(maniAtoms: ManiAtoms, get: Getter): LaunchDataAll {
    const loginFormCtx = maniAtoms[FormIdx.login];
    const cpassFormCtx = maniAtoms[FormIdx.cpass];

    let login: LaunchData = { url: undefined, exe: undefined, isWeb: false };
    let cpass: LaunchData = { url: undefined, exe: undefined, isWeb: false };

    if (loginFormCtx) {
        login.url = get(loginFormCtx.options.p2Detect.ourlAtom).data;
        login.exe = stripDoubleQuotes(get(loginFormCtx.options.p2Detect.commandlineAtom).data, get);
        login.isWeb = get(loginFormCtx.options.isWebAtom);
    }

    if (cpassFormCtx) {
        cpass.url = get(cpassFormCtx.options.p2Detect.ourlAtom).data;
        cpass.exe = stripDoubleQuotes(get(cpassFormCtx.options.p2Detect.commandlineAtom).data, get);
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


function stripDoubleQuotes(value: string | undefined, get: Getter): string | undefined {
    if (!value) {
        return value;
    }

    // It can be "%ProgramFiles%\Internet Explorer\iexplore.exe" so we need to expand env variables
    const expandedValue = expandEnvVariablesWindows(value, get);

    // It can be 'C%3a%5cWindows%5cexplorer.exe' and probably should be done in pm-manifest library
    const decodedValue = decodeURIComponent(expandedValue);

    if (decodedValue.startsWith('"') && decodedValue.endsWith('"')) {
        return decodedValue.slice(1, -1);
    }
    return decodedValue;
}
