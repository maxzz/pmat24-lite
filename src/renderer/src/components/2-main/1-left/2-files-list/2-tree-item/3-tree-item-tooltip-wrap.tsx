import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/ui";
import { TooltipArrow } from "@radix-ui/react-tooltip";

export function TreeItemTooltip({ trigger, body }: { trigger: ReactNode; body: ReactNode; }) {
    return (
        <TooltipProvider>
            <Tooltip /** / open={true}/**/>
                <TooltipTrigger asChild>
                    <div>
                        {trigger}
                    </div>
                </TooltipTrigger>

                <TooltipPortal>
                    <TooltipContent className="p-0 max-w-72 text-xs border-border border shadow">
                        {body}
                        <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                </TooltipPortal>
            </Tooltip>
        </TooltipProvider>
    );
}
