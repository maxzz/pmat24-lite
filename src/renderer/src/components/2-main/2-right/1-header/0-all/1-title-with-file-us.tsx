import { FileUs } from "@/store/store-types";
import { appTypeToIcon, fileUsToAppType } from "@/store/store-utils";

export function TitleWithFileUs({ fileUs }: { fileUs: FileUs; }) {

    const { icon, hasBailOut } = fileUsToAppType(fileUs);
    const Icon = appTypeToIcon(icon, hasBailOut);

    return (
        <div className="py-1 text-muted-foreground space-y-1">
            
            <div className="flex items-center gap-1">
                <Icon className="size-5" />
                {fileUs.stats.domain
                    ? `website ${fileUs.stats.domain}`
                    : 'Windows App'
                }
            </div>

            <div className="">Title {fileUs.stats.title}</div>
            <div className="">Name {fileUs.fname}</div>
        </div>
    );
}
