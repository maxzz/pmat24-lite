import { FileUs } from "@/store/store-types";
import { fileUsToAppType, appTypeToIcon, isManual, formToAppTypeIcons } from "@/store/store-utils";

export function ManiAppIcons({ fileUs }: { fileUs: FileUs; }) {
    const Icons = formToAppTypeIcons(fileUs);
    
    const iconTypeWithWarning = fileUsToAppType(fileUs);
    const Icon = appTypeToIcon(iconTypeWithWarning);

    const manual = isManual(fileUs);

    return (
        <div className="flex items-center gap-1">
            {Icons.map((Icon, idx) => (
                <Icon key={idx} className="size-4" />
            ))}
        </div>
    );
}

// export function ManiAppIcons({ fileUs }: { fileUs: FileUs; }) {
//     const iconTypeWithWarning = fileUsToAppType(fileUs);
//     const Icon = appTypeToIcon(iconTypeWithWarning);

//     const manual = isManual(fileUs);

//     return <Icon className="size-4" />;
// }
