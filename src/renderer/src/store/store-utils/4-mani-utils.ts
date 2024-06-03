import { Mani, Meta } from '@/store/manifest';

// Utilities at form level

export const isManualForm = (form: Meta.Form | undefined): boolean => !!form?.disp.isScript;

export const isWebForm = (form: Meta.Form | undefined): boolean => !!form?.disp.domain;

export const isWhyForm = (form: Meta.Form | undefined): boolean => !!form?.disp.bailOut;

// Utilities at file level

export const isManual = (meta: Meta.Form[] | undefined): boolean => !!meta?.some(isManualForm);

export const isEmpty = (meta: Meta.Form[] | undefined): boolean => !meta?.length || !!meta?.some((form: Meta.Form) => form.disp.noFields);

export const isAnyWeb = (meta: Meta.Form[] | undefined): boolean => !!meta?.[0]?.disp.domain || !!meta?.[1]?.disp.domain;

export const isAnyIe6 = (meta: Meta.Form[] | undefined): boolean => !!meta?.[0]?.disp.isIe || !!meta?.[1]?.disp.isIe;

export const isAnyWhy = (meta: Meta.Form[] | undefined): boolean => !!meta?.[0]?.disp.bailOut || !!meta?.[1]?.disp.bailOut;

export function isAnyCap(mani: Mani.Manifest | undefined, regex: RegExp | undefined): boolean {
    const forms = mani?.forms;
    const form0 = forms?.[0]?.detection?.caption;
    const form1 = forms?.[1]?.detection?.caption;
    return regex ? !!form0?.match(regex) || !!form1?.match(regex) : !!form0 || !!form1;
}

export function isAnyCls(mani: Mani.Manifest | undefined, regex: RegExp | undefined): boolean {
    const forms = mani?.forms;
    const form0 = forms?.[0]?.detection?.dlg_class;
    const form1 = forms?.[1]?.detection?.dlg_class;
    return regex ? !!form0?.match(regex) || !!form1?.match(regex) : !!form0 || !!form1;
}

// Misc

function stripFirstFolder(s: string): string {
    return (s || '').split(/[\/\\]/).slice(1).join('/');
}
