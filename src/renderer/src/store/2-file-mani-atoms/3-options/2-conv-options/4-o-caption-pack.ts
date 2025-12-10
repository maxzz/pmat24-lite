//TODO: add function that will convert string to:
//  if caption "[m0]:2:1:name" starts with "[m0]:2:1:" returns {caption: "*name", variablecaption: "name"}
//  if caption "[m0]:2:2:name" starts with "[m0]:2:2:" returns {caption: "name*", variablecaption: "name"}
//  if caption "[m0]:2:3:name" starts with "[m0]:2:3:" returns {caption: "*name*", variablecaption: "name"}
//  otherwise returns {caption: "name", variablecaption: "name"}

/**
 * Converts a caption string with a special marker (e.g., "[m0]:2:1:name") into
 * an object with the appropriate `caption` and `variablecaption` values.
 *
 * This is used in manifests to support window caption matching with wildcards.
 *
 * The formats supported are:
 *   - "[m0]:2:1:name" --> { caption: "*name", variablecaption: "name" }
 *   - "[m0]:2:2:name" --> { caption: "name*", variablecaption: "name" }
 *   - "[m0]:2:3:name" --> { caption: "*name*", variablecaption: "name" }
 *   - Any other string (including empty string) returns:
 *         { caption: <input>, variablecaption: <input> }
 *
 * This logic helps abstract away the parsing of caption with wildcards and
 * lets the UI display both the wildcarded caption (for preview) and the plain
 * variable part (for editing).
 *
 * @param caption The source caption string, possibly in special marker format.
 * @returns Object with `caption` (including wildcards as required) and `variablecaption` (the variable part).
 */
export function unpackCaption(caption: string): { caption: string, variablecaption: string } {
    // Try to match one of the known special patterns by regex:
    // - [m0]:2:1:<name>
    // - [m0]:2:2:<name>
    // - [m0]:2:3:<name>
    const match = caption.match(/^\[m0\]:2:([123]):(.*)$/);
    if (match) {
        const [, type, name] = match;
        // Map each code to its wildcard caption style
        const format = { '1': `*${name}`, '2': `${name}*`, '3': `*${name}*` };
        return { caption: format[type as keyof typeof format], variablecaption: name };
    }
    // For regular captions (no marker), return as both fields
    return { caption, variablecaption: caption };
}

// The inverse of `unpackCaption` from caption with stars like "*name" return encoded caption like "[m0]:2:1:name" without stars and variablecaption "name"
export function packCaptionToMain(caption: string): { encodedCaption: string, variablecaption: string } {
    const start = caption.startsWith('*');
    const end = caption.endsWith('*');

    if (!start && !end) {
        return { encodedCaption: caption, variablecaption: caption };
    }

    const type = start && end ? '3' : start ? '1' : '2';
    const variablecaption = caption.slice(start ? 1 : 0, end ? -1 : undefined);

    return {
        encodedCaption: `[m0]:2:${type}:${variablecaption}`,
        variablecaption
    };
}

