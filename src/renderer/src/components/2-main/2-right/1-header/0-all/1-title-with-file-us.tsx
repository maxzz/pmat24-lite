import { FileUs } from "@/store/store-types";
import { appTypeToIcon, fileUsToAppType } from "@/store/store-utils";

export function TitleWithFileUs({ fileUs }: { fileUs: FileUs; }) {

    const { icon, hasBailOut } = fileUsToAppType(fileUs);
    const Icon = appTypeToIcon(icon, hasBailOut);

    return (
        <div className="py-1 text-muted-foreground space-y-1 cursor-default">
            
            <div className="flex items-center gap-1">
                <Icon className="size-5" />
                {fileUs.stats.domain
                    ? `Website: ${fileUs.stats.domain}`
                    : 'Windows application'
                }
            </div>

            <div className="" title="Title from file">{fileUs.stats.title}</div>
            <div className="" title="Filename">{fileUs.fname}</div>
        </div>
    );
}
