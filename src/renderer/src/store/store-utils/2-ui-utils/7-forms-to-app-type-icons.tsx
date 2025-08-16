import { type FileUs } from "@/store/store-types";
import { type TreenIconComponent } from "@/ui/shadcn/tree";
import { isAnyIe6, isFormManual, isFormWeb, isFormWhy } from "@/store/manifest";
import { type IconEnumWithWarning, getFormIconEnum } from "./7-file-us-to-app-type";
import { FormIconEnum, formTypeToIcon } from "./8-form-type-to-icon";

export function getRightHeaderIcons(fileUs: FileUs, uiOptShowIeWarnIcon: boolean): TreenIconComponent[] {
    if (fileUs.parsedSrc.stats.isFCat) {
        return [formTypeToIcon([{ iconEnum: FormIconEnum.cat, warn: false }])];
    }

    if (!fileUs.parsedSrc.meta) {
        return [];
    }

    const metaForms = fileUs.parsedSrc.meta.map(
        (metaForm) => {
            if (!metaForm) {
                return;
            }

            const iconEnum = getFormIconEnum({
                isWeb: isFormWeb(metaForm),
                isIe: isAnyIe6(fileUs.parsedSrc.meta),
                isManual: isFormManual(metaForm),
                uiOptShowIeWarnIcon,
            });
            const hasBailOut = isFormWhy(metaForm);

            const rv: IconEnumWithWarning = {
                iconEnum,
                warn: hasBailOut,
            };
            return rv;
        }
    ).filter(Boolean);

    const rv: TreenIconComponent[] = [];

    const login = metaForms?.[0];
    if (login) {
        rv.push(formTypeToIcon([login]));
    }

    const cpass = metaForms?.[1];
    if (login && cpass && (login.iconEnum !== cpass.iconEnum || login.warn !== cpass.warn)) {
        rv.push(formTypeToIcon([cpass]));
    }

    return rv;
}
