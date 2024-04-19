import { FileUs } from "@/store/store-types";
import { Meta } from '@/store/manifest';

// Utilities

export const isManual = (fileUs: FileUs): boolean => !!fileUs.meta?.some((form: Meta.Form) => form.disp.isScript);

export const isEmpty = (fileUs: FileUs): boolean => !fileUs.meta?.length || !!fileUs.meta?.some((form: Meta.Form) => form.disp.noFields);

export const isAnyWeb = (fileUs: FileUs): boolean => !!fileUs.meta?.[0]?.disp.domain || !!fileUs.meta?.[1]?.disp.domain;

export const isAnyIe6 = (fileUs: FileUs): boolean => !!fileUs.meta?.[0]?.disp.isIe || !!fileUs.meta?.[1]?.disp.isIe;

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

// Misc

function stripFirstFolder(s: string): string {
    return (s || '').split(/[\/\\]/).slice(1).join('/');
}
