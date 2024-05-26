import { Fragment } from "react";
import { Button, Popover, PopoverArrorWoBottom, PopoverClose, PopoverContent, PopoverPortal, PopoverTrigger, ScrollArea } from "@/ui";
import { helpRules } from "./20-help-rules";
import { SymbolCross } from "@/ui/icons";

//TODO: it should be popup with trigger button
export function RulesHelpPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="absolute right-2 h-6 aspect-square rounded-full" variant="outline" size="xs" tabIndex={-1} title="Explanation" >
                    ?
                </Button>
            </PopoverTrigger>

            <PopoverPortal>
                <PopoverContent className="relative p-4 w-96 text-foreground bg-background border-border border shadow" sideOffset={5} align="center">

                    <div className="text-xs">
                        <div className="mb-4 text-center">
                            Custom rule
                        </div>

                        <ScrollArea className="h-64" fullHeight>

                            <div className="p-4 grid grid-cols-[auto,auto] gap-2">
                                {helpRules.map((rule, idx) => (
                                    <Fragment key={idx}>
                                        <div className="font-bold">{rule.c1}</div>
                                        <div>{rule.c2}</div>
                                    </Fragment>
                                ))}
                            </div>

                        </ScrollArea>
                    </div>

                    <PopoverClose className="absolute top-4 right-4">
                        <SymbolCross className="size-3" />
                    </PopoverClose>

                    <PopoverArrorWoBottom className="fill-background stroke-border" />

                </PopoverContent>
            </PopoverPortal>

        </Popover>
    );
}
