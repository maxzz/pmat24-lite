import { Fragment } from "react";
import { Popover, PopoverArrorWoBottom, PopoverClose, PopoverContent, PopoverPortal, ScrollArea } from "@/ui";
import { Button, PopoverTrigger } from "@/ui";
import { SymbolCross } from "@/ui/icons";
import { inlineButtonClasses } from "../8-inline-styles";
import { helpRules } from "./9-explanation-rules-text";

export function ButtonRulesHelp() {
    return (
        <Popover>
            <HelpTrigger />

            <PopoverPortal>
                <PopoverContent className="relative mx-4 p-0 w-[460px] text-foreground bg-background border-border border shadow-sm" sideOffset={5} align="center">

                    <div className="my-3 text-xs">
                        <div className="mb-2 text-base text-center">
                            Custom rule parts
                        </div>

                        <ScrollArea className="h-64" fullHeight>
                            <RulesHelpBody />
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

function HelpTrigger() {
    return (
        <PopoverTrigger asChild>
            <Button className={inlineButtonClasses} size="sm" tabIndex={-1} title="Explanation">
                ?
            </Button>
        </PopoverTrigger>
    );
}

function RulesHelpBody() {
    return (
        <div className="mb-4 px-4 grid grid-cols-[auto_auto] gap-2">
            {helpRules.map((rule, idx) => (
                <Fragment key={idx}>
                    <div className="text-center font-bold">
                        {rule.c1}
                    </div>

                    <div className="mr-3">
                        {rule.c2}
                    </div>
                </Fragment>
            ))}
        </div>
    );
}
