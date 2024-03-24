import { FileUs } from "@/store/store-types";
import { isAnyWhy } from "@/store/store-utils";
import { Button, Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/ui";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { CardTitleFileIndex } from "./1-file-index";
import { TooltipBody } from "./3-tooltip-body";

export function TooltipAttention({ fileUs }: { fileUs: FileUs; }) {
    const hasBailOut = isAnyWhy(fileUs);
    const fileIndex = fileUs.idx + 1;

    if (!hasBailOut) {
        return <CardTitleFileIndex idx={fileIndex} />;
    }

    return (
        <TooltipProvider>
            <Tooltip /** / open={true}/**/>
                <TooltipTrigger asChild>
                    <div>
                        <CardTitleFileIndex idx={fileIndex} errors={true} />
                    </div>
                </TooltipTrigger>

                <TooltipPortal>
                    <TooltipContent className="p-0 max-w-72 text-xs border-border border shadow">
                        <TooltipBody fileUs={fileUs} fileIndex={fileIndex} />
                        <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                </TooltipPortal>
            </Tooltip>
        </TooltipProvider>
    );
}
