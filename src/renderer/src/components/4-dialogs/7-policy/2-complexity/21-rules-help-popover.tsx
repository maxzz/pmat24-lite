import { Fragment } from "react";
import { Button, Popover, PopoverArrorWoBottom, PopoverClose, PopoverContent, PopoverPortal, PopoverTrigger } from "@/ui";
import { helpRules } from "./20-help-rules";
import { SymbolCross } from "@/ui/icons";

//TODO: it should be popup with trigger button
export function RulesHelpPopover() {
    return (
        <Popover>
            {/* <PopoverTrigger className="absolute right-2 h-6 aspect-square rounded-full">
                    ?
                </PopoverTrigger>
            */}
            <PopoverTrigger asChild>
                <Button className="absolute right-2 h-6 aspect-square rounded-full" variant="outline" size="xs" tabIndex={-1} title="Explanation" >
                    ?
                </Button>
            </PopoverTrigger>

            <PopoverPortal>
                <PopoverContent className="relative text-foreground bg-background border-border border shadow" sideOffset={5} align="center">

                    <div className="p-4 max-w-2xl text-xs">
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

                    <PopoverClose className="absolute top-4 right-4">
                        <SymbolCross className="size-3" />
                    </PopoverClose>

                    <PopoverArrorWoBottom className="fill-background stroke-border" />

                </PopoverContent>
            </PopoverPortal>

        </Popover>
    );
}
