import { FileUs, FileUsStats, FormIdx } from "./store-types";
import { TimeUtils, Meta } from './manifest';

export function textFileReader(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const aborted = () => reject(`File (${file.name}) reading was aborted`);
        reader.onabort = aborted;
        reader.onerror = aborted;
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.readAsText(file);
    });
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const isObject = (value: any): boolean => value && typeof value === 'object';

// Utilities

export const isManual = (fileUs: FileUs): boolean => !!fileUs.meta?.some((form: Meta.Form) => form.disp.isScript);
export const isEmpty = (fileUs: FileUs): boolean => !fileUs.meta || !fileUs.meta.length || !!fileUs.meta?.some((form: Meta.Form) => form.disp.noFields);
export const isAnyWeb = (fileUs: FileUs): boolean => !!fileUs.meta?.[0]?.disp.domain || !!fileUs.meta?.[1]?.disp.domain;
export const isAnyWhy = (fileUs: FileUs): boolean => !!fileUs.meta?.[0]?.disp.bailOut || !!fileUs.meta?.[1]?.disp.bailOut;
export function isAnyCap(fileUs: FileUs, regex: RegExp | undefined): boolean {
    const forms = fileUs.mani?.forms;
    const form0 = forms?.[0]?.detection?.caption;
    const form1 = forms?.[1]?.detection?.caption;
    return regex ? !!form0?.match(regex) || !!form1?.match(regex) : !!form0 || !!form1;
}
export function isAnyCls(fileUs: FileUs, regex: RegExp | undefined): boolean {
    const forms = fileUs.mani?.forms;
    const form0 = forms?.[0]?.detection?.dlg_class;
    const form1 = forms?.[1]?.detection?.dlg_class;
    return regex ? !!form0?.match(regex) || !!form1?.match(regex) : !!form0 || !!form1;
}

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

// Miscellaneous

export function formIdxName(formIdx: FormIdx) {
    return formIdx === FormIdx.login ? 'Login' : formIdx === FormIdx.cpass ? 'Password change' : '';
}

export function formCaption({ domain, url, isFCat, isCustomization }: FileUsStats): string {
    return url ? domain || '' : isFCat ? 'FIELD CATALOG' : isCustomization ? 'CUSTOMIZATION' : domain || 'WINDOWS APPLICATION';
}

function stripFirstFolder(s: string): string {
    return (s || '').split(/[\/\\]/).slice(1).join('/');
}

export function fileUsStats(fileUs: FileUs): FileUsStats {
    const loginForm = fileUs.mani?.forms[0];
    const domain = fileUs.meta?.[0]?.disp.domain;
    const isWeb = !!domain;
    const isSubFolder = !!fileUs.fpath; // fpath is empty for single items //const hasSubFolders = !!fileUs.fpath?.match(/\//);
    return {
        domain,
        isWeb,
        isChrome: isWeb && !fileUs.meta?.[0]?.disp.isIe,
        isFCat: !!fileUs.fcat,
        isCustomization: !fileUs.meta?.length && !!fileUs.mani?.options,
        url: loginForm?.detection.web_ourl,
        title: loginForm?.options.choosename,
        isSubFolder: isSubFolder,
        subFolder: fileUs.fpath || '', // subFolder: hasSubFolders ? stripFirstFolder(fileUs.fpath) : fileUs.fpath || '',
        dateCreated: TimeUtils.dpTimeToShow(fileUs.mani?.descriptor?.created),
        dateModified: TimeUtils.dpTimeToShow(fileUs.mani?.descriptor?.modified),
    };
}

// More to come...

//TODO: if field catalog file exist then put it in front.
