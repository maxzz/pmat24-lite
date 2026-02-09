import { useEffect } from "react";
import { atom, useSetAtom } from "jotai";
import { R2MInvokes, hasMain } from "@/xternal-to-main";

export const processEnvAtom = atom<Record<string, string>>({});

export function OnAppMountGetProcessEnv() {
    const setEnv = useSetAtom(processEnvAtom);

    useEffect(
        () => {
            if (hasMain()) {
                R2MInvokes.getProcessEnv().then(setEnv).catch(console.error);
            }
        },
        []);

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

/**
 * Replace known filesystem paths with their corresponding `%EnvVar%` references.
 * Case-insensitive matching; longest env-value is tried first so that
 * `C:\Program Files (x86)` is matched before `C:\Program Files`.
 *
 * E.g. `C:\Program Files (x86)\MyApp\app.exe`
 *    → `%ProgramFiles(x86)%\MyApp\app.exe`
 */
export function replacePathWithEnvVars(filepath: string, get: Getter): string {
    if (!filepath) {
        return filepath;
    }

    const env = get(processEnvAtom);

    // Env vars whose values are folder paths we want to collapse back.
    // Order matters only as a tie-breaker; we sort by value length below.
    const varNames = ['ProgramFiles(x86)', 'ProgramW6432', 'ProgramFiles'];

    const replacements = varNames
        .filter((name) => !!env[name])
        .map((name) => ({ name, value: env[name] }))
        .sort((a, b) => b.value.length - a.value.length); // longest first

    const lowerFilepath = filepath.toLowerCase();

    for (const { name, value } of replacements) {
        const pos = lowerFilepath.indexOf(value.toLowerCase());
        if (pos !== -1) {
            return filepath.substring(0, pos) + `%${name}%` + filepath.substring(pos + value.length);
        }
    }

    return filepath;
}

/*
inline wstring_t replace_programfiles2env(const wstring_t& filepath_)
{
    if (filepath_.empty())
    {
        return wstring_t();
    }

    wstring_t rv = filepath_;

    wstring_t lostr_filepath = strings::tolowercase(filepath_);

    wstring_t::size_type pos = lostr_filepath.find(L"program files (x86)");
    if (pos != wstring_t::npos)
    {
        if (pos <= 3 )
        {
            rv = wstring_t(L"%ProgramFiles(x86)%") + filepath_.substr(pos + 19);
        }
        else
        {
            rv = filepath_.substr(0, pos - 3) + wstring_t(L"%ProgramFiles(x86)%") + filepath_.substr(pos + 19);
        }
    }
    else
    {
        // Check for "program files".
        //
        pos = lostr_filepath.find(L"program files");
        if (pos != wstring_t::npos)
        {
            if (pos <= 3 )
            {
                rv = wstring_t(L"%ProgramFiles%") + filepath_.substr(pos + 13);
            }
            else
            {
                rv = filepath_.substr(0, pos - 3) + wstring_t(L"%ProgramFiles%") + filepath_.substr(pos + 13);
            }
        }
    }

    return rv;
}
*/