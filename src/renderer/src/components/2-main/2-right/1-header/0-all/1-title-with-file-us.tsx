import { FileUs } from "@/store/store-types";
import { ManiAppIcons } from "./2-mani-icons";
import { ManiExplanation } from "./3-mani-explanation";
import { ManiFilenameParts } from "./4-filename-parts";

export function TitleWithFileUs({ fileUs }: { fileUs: FileUs; }) {
    return (
        <div className="py-1 text-muted-foreground space-y-1.5 cursor-default">

            <div className="pl-1 1text-foreground text-sm font-semibold" title="Name from manifest file">
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
