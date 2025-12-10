/**
 * Converts a caption string with a special marker (e.g., "[m0]:2:1:name") into
 * an object with the appropriate `caption` and `variablecaption` values.
 * This is used in manifests to support window caption matching with wildcards.
 *
 * The formats supported are:
 *   - "[m0]:2:1:name" --> { caption: "*name", variablecaption: "name" }
 *   - "[m0]:2:2:name" --> { caption: "name*", variablecaption: "name" }
 *   - "[m0]:2:3:name" --> { caption: "*name*", variablecaption: "name" }
 *   - otherwise --> { caption: <input>, variablecaption: <input> }
 *
 * This logic helps abstract away the parsing of caption with wildcards and
 * lets the UI display both the wildcarded caption (for preview) and the plain
 * variable part (for editing).
 *
 * @param caption The source caption string, possibly in special marker format.
 * @returns Object with `caption` (including wildcards as required) and `variablecaption` (the variable part).
 */
export function unpackCaption(caption: string): { caption: string, variablecaption: string; } {
    const match = caption.match(/^\[m0\]:2:([123]):(.*)$/);
    if (match) {
        const [, type, name] = match;
        const format = { '1': `*${name}`, '2': `${name}*`, '3': `*${name}*` };
        return { caption: format[type as keyof typeof format], variablecaption: name };
    }
    return { caption, variablecaption: caption };
}

/**
 * The inverse of `unpackCaption` from caption with stars like "*name" return encoded caption like "[m0]:2:1:name" without stars and variablecaption "name"
 * 
 * The formats supported are:
 *   - "*name" --> { caption: "[m0]:2:1:name", variablecaption: "name" }
 *   - "name*" --> { caption: "[m0]:2:2:name", variablecaption: "name" }
 *   - "*name*" --> { caption: "[m0]:2:3:name", variablecaption: "name" }
 *   - otherwise --> { caption: <input>, variablecaption: <input> }
 * 
 * @param caption Usually the user's edited text, possibly including * at start/end.
 * @returns Object with `caption` (including wildcards as required) and `variablecaption` (the variable part).
 */
export function packCaptionToMain(caption: string): { caption: string, variablecaption: string; } {
    const start = caption.startsWith('*');
    const end = caption.endsWith('*');

    if (!start && !end) {
        return { caption, variablecaption: caption };
    }

    const type = start && end
        ? '3'
        : start
            ? '1'
            : '2';
    const variablecaption = caption.slice(start ? 1 : 0, end ? -1 : undefined);

    return {
        caption: `[m0]:2:${type}:${variablecaption}`,
        variablecaption
    };
}
