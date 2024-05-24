import { Fragment } from "react";
import { Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider } from "@/ui";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { helpRules } from "./20-help-rules";

export function RulesHelpPopup() {
    return (
        <TooltipProvider>
            <Tooltip open>
                {/* <TooltipTrigger asChild>
                    <Button className="absolute right-2 h-6 aspect-square rounded-full" variant="outline" size="xs" tabIndex={-1} title="Explanation" >
                        ?
                    </Button>
            </TooltipTrigger> */}
                <TooltipTrigger className="absolute right-2 h-6 aspect-square rounded-full">
                    ?
                </TooltipTrigger>

                <TooltipPortal>
                    <TooltipContent className="text-foreground bg-background border-border border shadow" sideOffset={5} align="center">

                        <div className="p-4 max-w-96 text-xs">
                            <div className="mb-4 text-center">
                                Custom rule
                            </div>

                            <div className="grid grid-cols-[auto,auto] gap-2">
                                {helpRules.map((rule, idx) => (
                                    <Fragment key={idx}>
                                        <div className="font-bold">{rule.c1}</div>
                                        <div>{rule.c2}</div>
                                    </Fragment>
                                ))}
                            </div>
                        </div>

                        <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                </TooltipPortal>
            </Tooltip>
        </TooltipProvider>
    );
}
