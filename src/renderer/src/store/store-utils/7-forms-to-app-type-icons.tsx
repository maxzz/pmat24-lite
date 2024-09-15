import { FileUs } from "../store-types";
import { TreenIconType } from "@/ui/shadcn/tree";
import { isAnyWhy, isManual, isManualForm, isWebForm, isWhyForm } from "@/store/manifest";
import { IconTypeWithWarning, getAppIconType } from "./7-file-us-to-app-type";
import { AppIconType, appTypeToIcon } from "./8-app-type-to-icon";

export function formToAppType(fileUs: FileUs): IconTypeWithWarning {

    const hasBailOut = isAnyWhy(fileUs.meta);

    // if (isAnyIe6(fcnt)) { // OK: but commented out ie6 for now. there are too many of them
    //     return { icon: AppIconType.ie6, hasBailOut };
    // }

    const appIcon = getAppIconType(fileUs.stats.isLoginFormWeb, isManual(fileUs.meta));

    return {
        appIcon,
        warning: hasBailOut,
    };
}

export function formToAppTypeIcons(fileUs: FileUs): TreenIconType[] {
    if (fileUs.fcat) {
        return [appTypeToIcon({ appIcon: AppIconType.cat, warning: false })];
    }

    if (!fileUs.meta) {
        return [];
    }

    const forms = fileUs.meta.map((form) => {
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
    }).filter(Boolean);

    const login = forms?.[0];
    const cpass = forms?.[1];

    const rv: TreenIconType[] = [];

    if (login) {
        rv.push(appTypeToIcon(login));
    }

    if (login && cpass && (login.appIcon !== cpass.appIcon || login.warning !== cpass.warning)) {
        rv.push(appTypeToIcon(cpass));
    }

    return rv;
}
