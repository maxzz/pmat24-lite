import { type FileUs } from "../store-types";
import { type TreenIconType } from "@/ui/shadcn/tree";
import { isAnyIe6, isAnyWhy, isManual, isManualForm, isWebForm, isWhyForm } from "@/store/manifest";
import { type IconTypeWithWarning, getAppIconType } from "./7-file-us-to-app-type";
import { AppIconType, appTypeToIcon } from "./8-app-type-to-icon";

// function formToAppType(fileUs: FileUs): IconTypeWithWarning {
//     const hasBailOut = isAnyWhy(fileUs.meta);
//     const appIcon = getAppIconType(fileUs.stats.isLoginFormWeb, isAnyIe6(fileUs.meta), isManual(fileUs.meta));
//     return {
//         appIcon,
//         warning: hasBailOut,
//     };
// }

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
        const isWeb = isWebForm(form);
        const isManual = isManualForm(form);
        const isIe = isAnyIe6(fileUs.meta) 

        const icon = getAppIconType(isWeb, isIe, isManual);

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
