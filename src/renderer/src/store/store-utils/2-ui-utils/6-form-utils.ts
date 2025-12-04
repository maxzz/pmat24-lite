import { FormIdx } from "@/store/8-manifest";
import { type FileUsStats } from "@/store/store-types";

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

export function formCaption({ loginFormDomain, isFCat, isCustomization }: FileUsStats): string {
    const rv =
        loginFormDomain
            ? loginFormDomain
            : isFCat
                ? 'FIELD CATALOG'
                : isCustomization
                    ? 'CUSTOMIZATION'
                    : 'WINDOWS APPLICATION';
    return rv;
}
