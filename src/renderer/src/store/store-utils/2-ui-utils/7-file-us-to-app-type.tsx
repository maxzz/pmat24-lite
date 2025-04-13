import { type FileUs } from "../../store-types";
import { isAnyWhy, isFormWeb, isFormIe6, isFormManual } from "@/store/manifest";
import { FormIconEnum } from "./8-form-type-to-icon";

export type IconEnumWithWarning = {
    iconEnum: FormIconEnum;
    warn?: boolean; // has warning icon (former uiOptShowIeWarnIcon or hasBailOut)
};

export function getFileListIconEnums(fileUs: FileUs, uiOptShowIeWarnIcon: boolean): IconEnumWithWarning[] {
    const { stats, meta } = fileUs.parsedSrc;

    if (stats.isFCat) {
        return [{
            iconEnum: FormIconEnum.cat,
            warn: false,
        }];
    }

    const rv: IconEnumWithWarning[] = [];

    // 1. Login form

    const iconEnum = getFormIconEnum({
        isWeb: isFormWeb(meta?.[0]),
        isIe: isFormIe6(meta?.[0]),
        isManual: isFormManual(meta?.[0]),
        uiOptShowIeWarnIcon,
    });
    const hasBailOut = isAnyWhy(meta);

    if (hasBailOut) {
        console.log("hasBailOut", {
            isWeb: isFormWeb(meta?.[0]),
            isIe: isFormIe6(meta?.[0]),
            isManual: isFormManual(meta?.[0]),
            uiOptShowIeWarnIcon,
        });
    }


    rv.push({
        iconEnum,
        warn: hasBailOut,
    });

    // 2. CPass form

    if (meta?.[1]) {
        const iconEnum = getFormIconEnum({
            isWeb: isFormWeb(meta?.[1]),
            isIe: isFormIe6(meta?.[1]),
            isManual: isFormManual(meta?.[1]),
            uiOptShowIeWarnIcon,
        });
        const hasBailOut = isAnyWhy(meta);

        rv.push({
            iconEnum,
            warn: hasBailOut,
        });
    }

    //

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
