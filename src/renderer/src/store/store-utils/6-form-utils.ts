import { FileUsStats, FormIdx } from "@/store/store-types";

// Miscellaneous

export function formIdxName(formIdx: FormIdx) {
    const rv =
        formIdx === FormIdx.login
            ? 'Login'
            : formIdx === FormIdx.cpass
                ? 'Password change'
                : '';
    return rv;
}

export function formCaption({ domain, url, isFCat, isCustomization }: FileUsStats): string {
    const rv =
        url
            ? domain || ''
            : isFCat
                ? 'FIELD CATALOG'
                : isCustomization
                    ? 'CUSTOMIZATION'
                    : domain || 'WINDOWS APPLICATION';
    return rv;
}
