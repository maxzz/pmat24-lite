import { atom, useSetAtom } from "jotai";
import { R2MInvokes, hasMain } from "@/xternal-to-main";
import { useEffect } from "react";

export const processEnvAtom = atom<Record<string, string>>({});

export function OnAppMountGetProcessEnv() {
    const setEnv = useSetAtom(processEnvAtom);

    useEffect(
        () => {
            if (hasMain()) {
                R2MInvokes.getProcessEnv().then(setEnv).catch(console.error);
            }
        }, []
    );

    return null;
}

export function expandEnvVariablesWindows(value: string, get: Getter): string {
    const env = get(processEnvAtom);

    // Replace %VAR% patterns with environment variable values
    return value.replace(/%([^%]+)%/g,
        (match, varName) => {
            const envValue = env[varName];
            return envValue !== undefined ? envValue : match;
        }
    );
}
