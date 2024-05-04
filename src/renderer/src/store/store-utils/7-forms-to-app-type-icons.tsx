import { FileUs } from "../store-types";
import { isAnyWhy, isManual, isManualForm, isWebForm, isWhyForm } from "./4-mani-utils";
import { IconTypeWithWarning, getAppIconType } from "./7-file-us-to-app-type";
import { AppIconType } from "./8-app-type-to-icon";

export function formToAppType(fileUs: FileUs): IconTypeWithWarning {

    const hasBailOut = isAnyWhy(fileUs);

    // if (isAnyIe6(fcnt)) { // OK: but commented out ie6 for now. there are too many of them
    //     return { icon: AppIconType.ie6, hasBailOut };
    // }

    const appIcon = getAppIconType(fileUs.stats.isWeb, isManual(fileUs));

    return {
        appIcon,
        warning: hasBailOut,
    };
}

export function formToAppTypeIcons(fileUs: FileUs) {
    if (fileUs.fcat) {
        return [{ appIcon: AppIconType.cat, warning: false }];
    }

    const forms = fileUs.meta?.map((form) => {
        if (!form) {
            return;
        }

        const hasBailOut = isWhyForm(form);
        const hasWeb = isWebForm(form);
        const hasManual = isManualForm(form);

        const icon = getAppIconType(hasWeb, hasManual);

        const rv: IconTypeWithWarning = {
            appIcon: icon,
            warning: hasBailOut,
        };

        return rv;
    });
}
