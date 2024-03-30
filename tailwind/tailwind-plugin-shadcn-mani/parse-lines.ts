export type CSSVarNameValue = Record<string, string>; // cssVarName (with --) --> cssVarValue (hsl, hex, rgb, length, etc)
export type FileThemes = Record<string, CSSVarNameValue>; // theme selector name (like :root or .dark) --> {cssVarName: cssVarValue}

// ":root": {
// :root: {
// "dark": {
// .dark: {
const isThemeNameRegex = /^\s*(['"])?([\.\:]?[a-zA-Z0-9\-]+)(?:['"])?\s*:?\s* \{\s*$/;

// "--background": "224 71% 4%",
// --background: 159 65% 4%;
const isCSSVarRegex = /^\s*(['"])?--([a-zA-Z0-9\-]+)(?:['"])?\s*:\s*(?:['"])?([^;"']+)(?:['"])?\s*[;,]?\s*$/;

/**
 * 
 * @param text 
 * ```
 `":root": {
        "--destructive": "0 100% 97%",
        "--destructive-foreground": "360 100% 45%",
        "--destructive-border": "359 100% 94%",
        "--destructive-border2": "359 100% 94%",
        "--destructive-border3": "359 100% 94%",
    },`
```
 * @returns 
 * ```json
 {
    "name": ":root",
    "values": {
        "--destructive": "0 100% 97%",
        "--destructive-foreground": "360 100% 45%",
        "--destructive-border": "359 100% 94%",
        "--destructive-border2": "359 100% 94%",
        "--destructive-border3": "359 100% 94%",
    }
}
```
 */
function parseTextToThemeVarsArray(text: string): ParsedSelectors[] {
    let rv: ParsedSelectors[] = [];

    let current: ParsedSelectors = { name: ':root', values: {} };
    rv.push(current);

    text.split(/\r?\n/)
        .forEach((line) => {
            const isVar = isCSSVarRegex.exec(line);
            if (isVar) {
                const [_, _quata, name, value] = isVar;

                current.values[`--${name}`] = value.trim();
            } else {
                const isName = isThemeNameRegex.exec(line);
                if (isName) {
                    const [_, _quata, name] = isName;

                    current = { name, values: {} };
                    rv.push(current);
                }
            }
        });

    rv = rv.filter((group) => Object.keys(group.values).length > 0);
    return rv;
}

type ParsedSelectors = {
    name: string;
    values: Record<string, string>;     // cssVarName(w/ '--') --> cssVarValue
};

/**
 * @returns 
 * ```json
 * {
 *     ":root": {
 *         "--background": "0 0% 100%",
 *         "--foreground": "222.2 47.4% 11.2%", // ...
 * 
 *         "--warning": "49 100% 97%",
 *         "--warning-foreground": "31 92% 45%",
 *         "--warning-border": "49 91% 91%",
 *     },
 *     ".dark": {
 *         "--background": "224 71% 4%",
 *         "--foreground": "213 31% 91%", // ...
 *     }
 * }
 * ```
 */
export function parseTextToCSSVars(text: string): FileThemes {
    const parsedSelectors = parseTextToThemeVarsArray(text);

    const rv = parsedSelectors.reduce((acc, themeSelector) => {
        acc[themeSelector.name] = themeSelector.values;
        return acc;
    }, {} as FileThemes);
    
    return rv;
}
