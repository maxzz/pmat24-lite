import { FileThemes } from "./parse-lines";
import type { RecursiveKeyValuePair } from 'tailwindcss/types/config';

/**
*```
* {
*   "--background": "0 0% 100%",
*   "--foreground": "222.2 47.4% 11.2%",
*   "--warning": {
*       "DEFAULT": "49 100% 97%",
*       "foreground": "31 92% 45%",
*       "border": "49 91% 91%",
*   },
* }
*```
*/
type ValueVar = Record<string, string>; // name -> value | Record<subName, value> // subName: 'DEFAULT' | 'foreground' | 'border' i.e. wo/ group name
type ValueVars = Record<string, ValueVar>;

/**
 * ```
 * in: --name-suffix-1-333
 * out: ["name", "suffix-1-333"]
 * ```
 */
const reVarName = /^--([^-]+)(?:-(.*))?/;

/**
 * 
 * @param fileThemes 
 * ```json
 {
     ":root": {
         "--background": "0 0% 100%",
         "--foreground": "222.2 47.4% 11.2%",
 
         "--warning": "49 100% 97%",
         "--warning-foreground": "31 92% 45%",
         "--warning-border": "49 91% 91%",
 
         "--mani-destructive": "359 100% 94%",
         "--mani-destructive-border": "359 100% 94%",
         "--mani-destructive-border3": "359 100% 94%",
     },
     ".dark": {
         "--background": "224 71% 4%",
         "--foreground": "213 31% 91%",
     }
 }
 * ```
 * @returns
 * ```json
 {
     ":root": {
         "background": "0 0% 100%",
         "foreground": "222.2 47.4% 11.2%",

         "warning": {
              "DEFAULT": "49 100% 97%",
              "foreground": "31 92% 45%",
              "border": "49 91% 91%",
         },
         "mani": {
              "destructive": {
                  "DEFAULT": "359 100% 94%",
                  "border": "359 100% 94%",
                  "border3": "359 100% 94%",
            },
         },
     },
     ".dark": {
         "background": "224 71% 4%",
         "foreground": "213 31% 91%",
     }
 }
 * ```
 */
export function parseToGroups(fileThemes: FileThemes): Record<string, RecursiveKeyValuePair<string, string>> {
    const groups: Record<string, RecursiveKeyValuePair> = {}; // themeName -> ValueVars

    Object.entries(fileThemes).forEach(([themeName, theme]) => {
        groups[themeName] = themeToGrouppedVars(theme);
    });

    return groups;

    function themeToGrouppedVars(vars: Record<string, string>) {
        let rv: RecursiveKeyValuePair = {};
        const invalidNames: Record<string, string>[] = [];

        Object.entries(vars).forEach(
            ([name, value]) => {
                if (!name.startsWith('--')) {
                    invalidNames.push({ [name]: value });
                    return;
                }

                const subnames = name.slice(2).split('-');
                const newObj = subnames.reverse().reduce((res, key, idx) => ({ [key]: !idx ? value : res }), {});
                rv = mergeColorVarsRecursive(rv, newObj);
            }
        );

        if (invalidNames.length) {
            console.warn(`Invalid CSS variable names:`, invalidNames);
        }

        return rv;
    }

    function mergeColorVarsRecursive(o1: Record<string, any>, o2: Record<string, any>) {
        const rv = { ...o1 };
    
        Object.entries(o2).forEach(
            ([key, value]) => {
                if (rv[key] && typeof rv[key] === 'object' && typeof value === 'object') {
                    rv[key] = mergeColorVarsRecursive(rv[key], value);
                } else {
                    if (typeof rv[key] === 'string') {
                        rv[key] = { DEFAULT: rv[key] };
                        rv[key] = mergeColorVarsRecursive(rv[key], value);
                    } else {
                        rv[key] = value;
                    }
                }
            }
        );
    
        return rv;
    }
}
