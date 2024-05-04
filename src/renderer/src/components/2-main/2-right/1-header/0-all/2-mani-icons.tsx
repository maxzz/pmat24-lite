import { FileUs } from "@/store/store-types";
import { fileUsToAppType, appTypeToIcon, isManual } from "@/store/store-utils";

export function ManiAppIcons({ fileUs }: { fileUs: FileUs; }) {
    const iconTypeWithWarning = fileUsToAppType(fileUs);
    const Icon = appTypeToIcon(iconTypeWithWarning);

    const manual = isManual(fileUs);

    return <Icon className="size-4" />;
}
