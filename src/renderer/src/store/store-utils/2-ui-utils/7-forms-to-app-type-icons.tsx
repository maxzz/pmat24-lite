import { type FileUs } from "../../store-types";
import { type TreenIconComponent } from "@/ui/shadcn/tree";
import { isAnyIe6, isManualForm, isWebForm, isWhyForm } from "@/store/manifest";
import { type IconTypeWithWarning, getAppIconType } from "./7-file-us-to-app-type";
import { FormIconEnum, formTypeToIcon } from "./8-form-type-to-icon";

export function formToAppTypeIcons(fileUs: FileUs, showIeWranIcon: boolean): TreenIconComponent[] {
    if (fileUs.parsedSrc.stats.isFCat) {
        return [formTypeToIcon({ formIcon: FormIconEnum.cat, warning: false })];
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

            const icon = getAppIconType({ isWeb, isIe, isManual, showIeWranIcon });

            const rv: IconTypeWithWarning = {
                formIcon: icon,
                warning: hasBailOut,
            };

            return rv;
        }
    ).filter(Boolean);

    const login = forms?.[0];
    const cpass = forms?.[1];

    const rv: TreenIconComponent[] = [];

    if (login) {
        rv.push(formTypeToIcon(login));
    }

    if (login && cpass && (login.formIcon !== cpass.formIcon || login.warning !== cpass.warning)) {
        rv.push(formTypeToIcon(cpass));
    }

    return rv;
}
