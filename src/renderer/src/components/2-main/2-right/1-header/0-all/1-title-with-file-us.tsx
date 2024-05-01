import { FileUs } from "@/store/store-types";
import { appTypeToIcon, fileUsToAppType } from "@/store/store-utils";


export function TitleWithFileUs({ fileUs }: { fileUs: FileUs; }) {

    const { icon, hasBailOut } = fileUsToAppType(fileUs);
    const Icon = appTypeToIcon(icon, hasBailOut);

    return (
        <div className="py-1 text-muted-foreground space-y-1">
            <Icon className="size-5" />
            <div className="">Title {fileUs.stats.title}</div>
            <div className="">Name {fileUs.fname}</div>
        </div>
    );
}
