import { type FileUs } from "@/store/store-types";
import { isAnyWhy, isFormWeb, isFormIe6, isFormManual } from "@/store/manifest";
import { FormIconEnum } from "./8-form-type-to-icon";

export type IconEnumWithWarning = {
    iconEnum: FormIconEnum;
    warn?: boolean; // has warning icon (former uiOptShowIeWarnIcon or hasBailOut)
};

export function getFileListIconEnums(fileUs: FileUs, uiOptShowIeWarnIcon: boolean): IconEnumWithWarning[] {
    const { stats, meta } = fileUs.parsedSrc;

    if (stats.isFCat) {
        return [{ iconEnum: FormIconEnum.cat, warn: false, }];
    }

    const rv: IconEnumWithWarning[] = [];
    if (!meta) {
        return [{ iconEnum: FormIconEnum.web, warn: true, }]; // Some unknown icon (so far as web icon since no forms means exclude for web) if manifest without forms
    }

    const [loginForm, cpassForm] = meta;
    const warn = isAnyWhy(meta); // We show warning icon for manifest with any form with warning

    if (loginForm) {
        const iconEnum = getFormIconEnum({ isWeb: isFormWeb(loginForm), isIe: isFormIe6(loginForm), isManual: isFormManual(loginForm), uiOptShowIeWarnIcon, });
        rv.push({ iconEnum, warn, });
    }

    if (cpassForm) {
        const iconEnum = getFormIconEnum({ isWeb: isFormWeb(cpassForm), isIe: isFormIe6(cpassForm), isManual: isFormManual(cpassForm), uiOptShowIeWarnIcon, });
        rv.push({ iconEnum, warn, });
    }

    return rv;
}

type GetFormIconEnumParams = {
    isWeb: boolean;
    isIe: boolean;
    isManual: boolean;
    uiOptShowIeWarnIcon: boolean;
};

export function getFormIconEnum({ isWeb, isIe, isManual, uiOptShowIeWarnIcon }: GetFormIconEnumParams): FormIconEnum {
    const icon =
        isManual
            ? FormIconEnum.man
            : isWeb
                ? isIe
                    ? uiOptShowIeWarnIcon
                        ? FormIconEnum.ie6 // There are too many of them and we don't have a nice icon for them, but now it's an option from the Options dialog
                        : FormIconEnum.web
                    : FormIconEnum.web
                : FormIconEnum.win;
    return icon;
}
