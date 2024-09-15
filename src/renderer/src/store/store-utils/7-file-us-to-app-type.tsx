import { isAnyIe6, isAnyWhy, isManual } from "@/store/manifest";
import { FileUs } from "../store-types";
import { AppIconType } from "./8-app-type-to-icon";

export type IconTypeWithWarning = {
    appIcon: AppIconType;
    warning?: boolean;
};

export function getAppIconType(isWeb: boolean, isIe: boolean, isManual: boolean): AppIconType {
    const icon =
        isWeb
            ? isIe
                ? AppIconType.web // AppIconType.ie6 // OK: but commented out ie6 for now. there are too many of them and we don't have a nice icon for them
                : AppIconType.web
            : isManual
                ? AppIconType.man
                : AppIconType.win;
    return icon;
}

export function fileUsToAppType(fileUs: FileUs): IconTypeWithWarning {
    if (fileUs.fcat) {
        return { appIcon: AppIconType.cat, warning: false };
    }

    const hasBailOut = isAnyWhy(fileUs.meta);
    const appIcon = getAppIconType(fileUs.stats.isLoginFormWeb, isAnyIe6(fileUs.meta), isManual(fileUs.meta));

    return {
        appIcon,
        warning: hasBailOut,
    };
}
