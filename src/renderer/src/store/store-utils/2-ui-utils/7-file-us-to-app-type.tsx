import { isAnyIe6, isAnyWhy, isManual } from "@/store/manifest";
import { FileUs } from "../../store-types";
import { FormIconEnum } from "./8-form-type-to-icon";

export type IconTypeWithWarning = {
    formIcon: FormIconEnum;
    warning?: boolean;
};

export function getAppIconType(isWeb: boolean, isIe: boolean, isManual: boolean, showIeWranIcon: boolean): FormIconEnum {
    const icon =
        isWeb
            ? isIe
                ? showIeWranIcon
                    ? FormIconEnum.ie6 // There are too many of them and we don't have a nice icon for them, but now it's an option from the Options dialog
                    : FormIconEnum.web
                : FormIconEnum.web
            : isManual
                ? FormIconEnum.man
                : FormIconEnum.win;
    return icon;
}

export function fileUsToAppType(fileUs: FileUs, showIeWranIcon: boolean): IconTypeWithWarning {
    if (fileUs.parsedSrc.stats.isFCat) {
        return { formIcon: FormIconEnum.cat, warning: false };
    }

    const hasBailOut = isAnyWhy(fileUs.parsedSrc.meta);
    const appIcon = getAppIconType(fileUs.parsedSrc.stats.isLoginFormWeb, isAnyIe6(fileUs.parsedSrc.meta), isManual(fileUs.parsedSrc.meta), showIeWranIcon);

    return {
        formIcon: appIcon,
        warning: hasBailOut,
    };
}
