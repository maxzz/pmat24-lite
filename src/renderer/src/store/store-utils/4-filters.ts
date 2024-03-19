import { FileUs } from "@/store/store-types";

// Regex

const reDefaultEscapeCharsRegex = /[-|\\{}()[\]^$+.]/g; // This is defult set but without *?

const reQuestion = /[\?]/g;
const reWildcard = /[\*]/g;
function convertToRegex(s: string): string {
    // 0. Wildcard to RegEx. First dot and only then star.
    return s.replace(reDefaultEscapeCharsRegex, '\\$&').replace(reQuestion, '.').replace(reWildcard, '.*');
}
type FilterParams = {
    winOnly: boolean;
    webOnly: boolean;
    whyOnly: boolean;
    capOnly: boolean; // caption
    clsOnly: boolean; // classname
    regex: RegExp | undefined;
};

export function createRegexByFilter(s?: string, casesensitive?: boolean): FilterParams {
    let winOnly = !!(s && s.match(/^win\:/));
    let webOnly = !!(s && s.match(/^web\:/));
    let whyOnly = !!(s && s.match(/^why\:/));
    let capOnly = !!(s && s.match(/^cap\:/));
    let clsOnly = !!(s && s.match(/^cls\:/));
    if (winOnly || webOnly || whyOnly || capOnly || clsOnly) {
        s = s?.replace(/^(win|web|why|cap|cls)\:/, '');
    }
    return {
        winOnly,
        webOnly,
        whyOnly,
        capOnly,
        clsOnly,
        regex: s && new RegExp(convertToRegex(s), casesensitive ? '' : 'i') || undefined
    };
}

// Filter

export function useFileUsByFilter(fileUs: FileUs, regex: RegExp): boolean {
    let useItNow = !!fileUs.fname.match(regex);

    if (!useItNow) {
        useItNow = !!fileUs.mani?.forms?.[0]?.options?.choosename?.match(regex);
    }

    if (!useItNow) {
        useItNow = !!fileUs.meta?.[0]?.mani.detection?.web_ourl?.match(regex);
    }

    if (!useItNow) {
        useItNow = !!fileUs.meta?.[1]?.mani.detection?.web_ourl?.match(regex);
    }

    return useItNow;
}
