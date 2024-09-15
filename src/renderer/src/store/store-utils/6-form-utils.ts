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

export function formCaption({ loginFormDomain, loginFormUrl, isFCat, isCustomization }: FileUsStats): string {
    const rv =
        loginFormUrl
            ? loginFormDomain || ''
            : isFCat
                ? 'FIELD CATALOG'
                : isCustomization
                    ? 'CUSTOMIZATION'
                    : loginFormDomain || 'WINDOWS APPLICATION';
    return rv;
}
