import { isAnyIe6, isAnyWhy, isManual } from "@/store/manifest";
import { FileUs } from "../../store-types";
import { FormIconEnum } from "./8-form-type-to-icon";

export type IconTypeWithWarning = {
    formIcon: FormIconEnum;
    warning?: boolean;
};

export function getAppIconType({ isWeb, isIe, isManual, showIeWranIcon }: { isWeb: boolean; isIe: boolean; isManual: boolean; showIeWranIcon: boolean; }): FormIconEnum {
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
    const { stats, meta } = fileUs.parsedSrc;

    if (stats.isFCat) {
        return { formIcon: FormIconEnum.cat, warning: false };
    }

    const hasBailOut = isAnyWhy(meta);
    const appIcon = getAppIconType({ isWeb: stats.isLoginFormWeb, isIe: isAnyIe6(meta), isManual: isManual(meta), showIeWranIcon });

    return {
        formIcon: appIcon,
        warning: hasBailOut,
    };
}
