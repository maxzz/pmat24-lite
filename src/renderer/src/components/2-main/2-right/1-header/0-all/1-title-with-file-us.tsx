import { FileUs } from "@/store/store-types";
import { appTypeToIcon, fileUsToAppType, isManual } from "@/store/store-utils";
import { ManiFilenameParts } from "./3-filename-parts";
import { ManiExplanation } from "./2-mani-explanation";

export function TitleWithFileUs({ fileUs }: { fileUs: FileUs; }) {

    const { icon, hasBailOut } = fileUsToAppType(fileUs);
    const Icon = appTypeToIcon(icon, hasBailOut);

    const manual = isManual(fileUs);

    return (
        <div className="py-1 text-muted-foreground space-y-1.5 cursor-default">

            <div className="pl-1 1text-foreground text-sm font-semibold" title="Name from manifest file">
                {fileUs.stats.title}
            </div>

            <div className="flex items-center gap-1.5">
                <Icon className="size-4" />
                <ManiExplanation fileUs={fileUs} />
            </div>

            <ManiFilenameParts fname={fileUs.fname} />
        </div>
    );
}
