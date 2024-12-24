import { type FileUs } from "../../store-types";
import { type TreenIconComponent } from "@/ui/shadcn/tree";
import { isAnyIe6, isManualForm, isWebForm, isWhyForm } from "@/store/manifest";
import { type IconTypeWithWarning, getFormIconEnum } from "./7-file-us-to-app-type";
import { FormIconEnum, formTypeToIcon } from "./8-form-type-to-icon";

export function getRightHeaderIcons(fileUs: FileUs, uiOptShowIeWarnIcon: boolean): TreenIconComponent[] {
    if (fileUs.parsedSrc.stats.isFCat) {
        return [formTypeToIcon([{ iconEnum: FormIconEnum.cat, uiOptShowIeWarnIcon: false }])];
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

            const iconEnum = getFormIconEnum({ isWeb, isIe, isManual, uiOptShowIeWarnIcon });

            const rv: IconTypeWithWarning = {
                iconEnum: iconEnum,
                uiOptShowIeWarnIcon: hasBailOut,
            };

            return rv;
        }
    ).filter(Boolean);

    const rv: TreenIconComponent[] = [];

    const login = forms?.[0];
    if (login) {
        rv.push(formTypeToIcon([login]));
    }

    const cpass = forms?.[1];
    if (login && cpass && (login.iconEnum !== cpass.iconEnum || login.uiOptShowIeWarnIcon !== cpass.uiOptShowIeWarnIcon)) {
        rv.push(formTypeToIcon([cpass]));
    }

    return rv;
}
