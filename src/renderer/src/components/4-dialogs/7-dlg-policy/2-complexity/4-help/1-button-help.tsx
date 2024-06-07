import { Fragment } from "react";
import { Button, Popover, PopoverArrorWoBottom, PopoverClose, PopoverContent, PopoverPortal, PopoverTrigger, ScrollArea } from "@/ui";
import { inlineButtonClasses } from "../3-custom-rule/2-button-test-area";
import { helpRules } from "./2-help-rules-text";
import { SymbolCross } from "@/ui/icons";
import { classNames } from "@/utils";

function ButtonTrigger() {
    return (
        <PopoverTrigger asChild>
            <Button className={classNames(inlineButtonClasses, "aspect-square")} size="sm" tabIndex={-1} title="Explanation">
                ?
            </Button>
        </PopoverTrigger>
    );
}

function RulesHelpBody() {
    return (
        <div className="mb-4 px-4 grid grid-cols-[auto,auto] gap-2">
            {helpRules.map((rule, idx) => (
                <Fragment key={idx}>
                    <div className="text-center font-bold">
                        {rule.c1}
                    </div>

                    <div>
                        {rule.c2}
                    </div>
                </Fragment>
            ))}
        </div>
    );
}

export function ButtonRulesHelp() {
    return (
        <Popover>
            <ButtonTrigger />

            <PopoverPortal>
                <PopoverContent className="relative mx-4 p-0 w-[460px] text-foreground bg-background border-border border shadow" sideOffset={5} align="center">

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
