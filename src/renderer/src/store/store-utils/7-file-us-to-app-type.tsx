import { FileUs } from "../store-types";
import { isAnyWhy, isManual } from "./4-mani-utils";
import { AppIconType } from "./8-app-type-to-icon";

export function fileUsToAppType(fcnt: FileUs): { icon: AppIconType; hasBailOut: boolean; } {
    if (fcnt.fcat) {
        return { icon: AppIconType.cat, hasBailOut: false };
    }

    const hasBailOut = isAnyWhy(fcnt);

    // if (isAnyIe6(fcnt)) { // OK: but commented out ie6 for now. there are too many of them
    //     return { icon: AppIconType.ie6, hasBailOut };
    // }

    const icon = fcnt.stats.isWeb
        ? AppIconType.web
        : isManual(fcnt)
            ? AppIconType.man
            : AppIconType.win;
            
    return {
        icon,
        hasBailOut,
    };
}
