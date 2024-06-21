import { FileUs } from "@/store/store-types";
import { ManiAppIcons } from "./2-1-mani-icons";
import { ManiExplanation } from "./2-2-mani-explanation";
import { ManiFilenameParts } from "./2-3-filename-parts";

export function TitleWithFileUs({ fileUs }: { fileUs: FileUs; }) {
    return (
        <div className="py-1 text-muted-foreground space-y-1.5 cursor-default">

            <div className="pl-1 text-sm font-semibold" title="Name from manifest file">
                {fileUs.stats.title}
            </div>

            <div className="flex items-center gap-1.5">
                <ManiAppIcons fileUs={fileUs} />
                <ManiExplanation fileUs={fileUs} />
            </div>

            <ManiFilenameParts fname={fileUs.fname} />
        </div>
    );
}
