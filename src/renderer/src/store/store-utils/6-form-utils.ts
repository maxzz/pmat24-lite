import { FileUsStats, FormIdx } from "@/store/store-types";

// Miscellaneous

export function formIdxName(formIdx: FormIdx) {
    return formIdx === FormIdx.login ? 'Login' : formIdx === FormIdx.cpass ? 'Password change' : '';
}

export function formCaption({ domain, url, isFCat, isCustomization }: FileUsStats): string {
    return url ? domain || '' : isFCat ? 'FIELD CATALOG' : isCustomization ? 'CUSTOMIZATION' : domain || 'WINDOWS APPLICATION';
}
