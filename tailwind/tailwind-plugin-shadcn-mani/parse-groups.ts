import { FileThemes } from "./parse-lines";

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
type ValueVar = string | Record<string, string>; // name -> value | Record<subName, value> // subName: 'DEFAULT' | 'foreground' | 'border' i.e. wo/ group name
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
 * {
 *     ":root": {
 *         "--background": "0 0% 100%",
 *         "--foreground": "222.2 47.4% 11.2%",
 * 
 *         "--warning": "49 100% 97%",
 *         "--warning-foreground": "31 92% 45%",
 *         "--warning-border": "49 91% 91%",
 *     },
 *     ".dark": {
 *         "--background": "224 71% 4%",
 *         "--foreground": "213 31% 91%",
 *     }
 * }
 * ```
 * @returns 
 * ```json
 * {
 *     ":root": {
 *         "--background": "0 0% 100%",
 *         "--foreground": "222.2 47.4% 11.2%",
 *
 *         "--warning": {
 *              "DEFAULT": "49 100% 97%",
 *              "foreground": "31 92% 45%",
 *              "border": "49 91% 91%",
 *         },
 *     },
 *     ".dark": {
 *         "--background": "224 71% 4%",
 *         "--foreground": "213 31% 91%",
 *     }
 * }
 * ```
 */
export function parseToGroups(fileThemes: FileThemes) {
    const rv: Record<string, ValueVars> = {}; // themeName -> ValueVars

    Object.entries(fileThemes).forEach(([themeName, theme]) => {
        rv[themeName] = themeToGrouppedVars(theme);
    });

    return rv;

    function themeToGrouppedVars(vars: Record<string, string>) {
        const rv: ValueVars = {};
        const invalidNames: Record<string, string>[] = [];

        Object.entries(vars).forEach(
            ([name, value]) => {
                const match = reVarName.exec(name);
                if (match) {
                    const [_, group, key] = match;
                    if (!rv[group]) {
                        rv[group] = {};
                    }

                    rv[group][key] = value;
                } else {
                    invalidNames.push({ [name]: value });
                }
            }
        );

        if (invalidNames.length) {
            console.warn(`Invalid CSS variable names:`, invalidNames);
        }

        return rv;
    }
}
