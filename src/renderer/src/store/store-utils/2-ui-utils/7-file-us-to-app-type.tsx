import { isAnyIe6, isAnyWhy, isManual } from "@/store/manifest";
import { FileUs } from "../../store-types";
import { FormIconType } from "./8-form-type-to-icon";

export type IconTypeWithWarning = {
    appIcon: FormIconType;
    warning?: boolean;
};

export function getAppIconType(isWeb: boolean, isIe: boolean, isManual: boolean, showIeWranIcon: boolean): FormIconType {
    const icon =
        isWeb
            ? isIe
                ? showIeWranIcon
                    ? FormIconType.ie6 // There are too many of them and we don't have a nice icon for them, but now it's an option from the Options dialog
                    : FormIconType.web
                : FormIconType.web
            : isManual
                ? FormIconType.man
                : FormIconType.win;
    return icon;
}

export function fileUsToAppType(fileUs: FileUs, showIeWranIcon: boolean): IconTypeWithWarning {
    if (fileUs.parsedSrc.stats.isFCat) {
        return { appIcon: FormIconType.cat, warning: false };
    }

    const hasBailOut = isAnyWhy(fileUs.parsedSrc.meta);
    const appIcon = getAppIconType(fileUs.parsedSrc.stats.isLoginFormWeb, isAnyIe6(fileUs.parsedSrc.meta), isManual(fileUs.parsedSrc.meta), showIeWranIcon);

    return {
        appIcon,
        warning: hasBailOut,
    };
}
