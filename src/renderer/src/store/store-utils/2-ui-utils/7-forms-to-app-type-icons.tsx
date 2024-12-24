import { type FileUs } from "../../store-types";
import { type TreenIconComponent } from "@/ui/shadcn/tree";
import { isAnyIe6, isManualForm, isWebForm, isWhyForm } from "@/store/manifest";
import { type IconTypeWithWarning, getAppIconType } from "./7-file-us-to-app-type";
import { AppIconType, appTypeToIcon } from "./8-form-type-to-icon";

export function formToAppTypeIcons(fileUs: FileUs, showIeWranIcon: boolean): TreenIconComponent[] {
    if (fileUs.parsedSrc.stats.isFCat) {
        return [appTypeToIcon({ appIcon: AppIconType.cat, warning: false })];
    }

    if (!fileUs.parsedSrc.meta) {
        return [];
    }

    const forms = fileUs.parsedSrc.meta.map(
        (form) => {
            if (!form) {
                return;
            }

            const hasBailOut = isWhyForm(form);
            const isWeb = isWebForm(form);
            const isManual = isManualForm(form);
            const isIe = isAnyIe6(fileUs.parsedSrc.meta);

            const icon = getAppIconType(isWeb, isIe, isManual, showIeWranIcon);

            const rv: IconTypeWithWarning = {
                appIcon: icon,
                warning: hasBailOut,
            };

            return rv;
        }
    ).filter(Boolean);

    const login = forms?.[0];
    const cpass = forms?.[1];

    const rv: TreenIconComponent[] = [];

    if (login) {
        rv.push(appTypeToIcon(login));
    }

    if (login && cpass && (login.appIcon !== cpass.appIcon || login.warning !== cpass.warning)) {
        rv.push(appTypeToIcon(cpass));
    }

    return rv;
}
