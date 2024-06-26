import { isAnyWhy, isManual } from "pm-manifest";
import { FileUs } from "../store-types";
import { AppIconType } from "./8-app-type-to-icon";

export type IconTypeWithWarning = {
    appIcon: AppIconType;
    warning?: boolean;
};

export function getAppIconType(isWeb: boolean, isManual: boolean): AppIconType {
    const icon = isWeb
        ? AppIconType.web
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

    // if (isAnyIe6(fcnt)) { // OK: but commented out ie6 for now. there are too many of them
    //     return { icon: AppIconType.ie6, hasBailOut };
    // }

    const appIcon = getAppIconType(fileUs.stats.isWeb, isManual(fileUs.meta));
            
    return {
        appIcon,
        warning: hasBailOut,
    };
}
