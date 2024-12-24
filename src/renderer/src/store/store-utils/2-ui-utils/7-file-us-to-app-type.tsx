import { type FileUs } from "../../store-types";
import { isAnyIe6, isAnyWhy, isManual } from "@/store/manifest";
import { FormIconEnum } from "./8-form-type-to-icon";

export type IconEnumWithWarning = {
    iconEnum: FormIconEnum;
    uiOptShowIeWarnIcon?: boolean;
};

export function getFileListIconEnums(fileUs: FileUs, uiOptShowIeWarnIcon: boolean): IconEnumWithWarning[] {
    const { stats, meta } = fileUs.parsedSrc;

    if (stats.isFCat) {
        return [{
            iconEnum: FormIconEnum.cat,
            uiOptShowIeWarnIcon: false,
        }];
    }

    const iconEnum = getFormIconEnum({
        isWeb: stats.isLoginFormWeb,
        isIe: isAnyIe6(meta),
        isManual: isManual(meta),
        uiOptShowIeWarnIcon: uiOptShowIeWarnIcon,
    });
    const hasBailOut = isAnyWhy(meta);

    return [{
        iconEnum,
        uiOptShowIeWarnIcon: hasBailOut,
    }];
}

type GetFormIconEnumParams = {
    isWeb: boolean;
    isIe: boolean;
    isManual: boolean;
    uiOptShowIeWarnIcon: boolean;
};

export function getFormIconEnum({ isWeb, isIe, isManual, uiOptShowIeWarnIcon }: GetFormIconEnumParams): FormIconEnum {
    const icon =
        isWeb
            ? isIe
                ? uiOptShowIeWarnIcon
                    ? FormIconEnum.ie6 // There are too many of them and we don't have a nice icon for them, but now it's an option from the Options dialog
                    : FormIconEnum.web
                : FormIconEnum.web
            : isManual
                ? FormIconEnum.man
                : FormIconEnum.win;
    return icon;
}
