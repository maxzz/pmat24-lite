import { type FileUs } from "../../store-types";
import { isAnyIe6, isAnyWhy, isManual } from "@/store/manifest";
import { FormIconEnum } from "./8-form-type-to-icon";

export type IconTypeWithWarning = {
    iconEnum: FormIconEnum;
    warning?: boolean;
};

export function fileUsToAppType(fileUs: FileUs, showIeWranIcon: boolean): IconTypeWithWarning {
    const { stats, meta } = fileUs.parsedSrc;

    if (stats.isFCat) {
        return { iconEnum: FormIconEnum.cat, warning: false };
    }

    const hasBailOut = isAnyWhy(meta);
    const appIcon = getFormIconEnum({ isWeb: stats.isLoginFormWeb, isIe: isAnyIe6(meta), isManual: isManual(meta), showIeWranIcon });

    return {
        iconEnum: appIcon,
        warning: hasBailOut,
    };
}

type GetFormIconEnumParams = {
    isWeb: boolean;
    isIe: boolean;
    isManual: boolean;
    showIeWranIcon: boolean;
};

export function getFormIconEnum({ isWeb, isIe, isManual, showIeWranIcon }: GetFormIconEnumParams): FormIconEnum {
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
