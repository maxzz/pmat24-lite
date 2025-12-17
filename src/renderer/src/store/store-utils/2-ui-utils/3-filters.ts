import { FileUs } from "@/store/store-types";

// Regex

export function createRegexByFilter(s?: string, casesensitive?: boolean): FilterParams {
    let winOnly = !!(s && s.match(/^win\:/));
    let webOnly = !!(s && s.match(/^web\:/));
    let whyOnly = !!(s && s.match(/^why\:/));
    let capOnly = !!(s && s.match(/^cap\:/));
    let clsOnly = !!(s && s.match(/^cls\:/));
    let extOnly = !!(s && s.match(/^ext\:/));

    if (winOnly || webOnly || whyOnly || capOnly || clsOnly) {
        s = s?.replace(/^(win|web|why|cap|cls)\:/, '');
    }
    
    return {
        winOnly,
        webOnly,
        whyOnly,
        capOnly,
        clsOnly,
        extOnly,
        regex: s && new RegExp(convertToRegex(s), casesensitive ? '' : 'i') || undefined
    };
}

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
    extOnly: boolean; // extended policy
    regex: RegExp | undefined;
};

// Filter

export function useFileUsByFilter(fileUs: FileUs, regex: RegExp): boolean {
    let useItNow = !!fileUs.fileCnt.fname.match(regex);

    if (!useItNow) {
        useItNow = !!fileUs.parsedSrc.mani?.forms?.[0]?.options?.choosename?.match(regex);
    }

    if (!useItNow) {
        useItNow = !!fileUs.parsedSrc.meta?.[0]?.mani.detection?.web_ourl?.match(regex);
    }

    if (!useItNow) {
        useItNow = !!fileUs.parsedSrc.meta?.[1]?.mani.detection?.web_ourl?.match(regex);
    }

    return useItNow;
}
