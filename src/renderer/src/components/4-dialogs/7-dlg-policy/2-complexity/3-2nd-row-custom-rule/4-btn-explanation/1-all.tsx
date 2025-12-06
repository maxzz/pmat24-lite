import { Fragment } from "react";
import { Popover, PopoverArrorWoBottom, PopoverClose, PopoverContent, ScrollArea } from "@/ui";
import { Button, PopoverTrigger } from "@/ui";
import { SymbolCross } from "@/ui/icons";
import { inlineButtonClasses } from "../8-inline-styles";
import { helpRules } from "./9-explanation-rules-text";

export function ButtonRulesHelp() {
    return (
        <Popover modal>
            <HelpTrigger />

            <PopoverContent className="relative mx-4 p-0 w-[380px] text-foreground bg-background border-border border shadow-sm" sideOffset={5} align="center">

                <PopoverClose className="group absolute size-5 p-1 top-2 right-2.5 hover:stroke-2 hover:text-white hover:bg-red-500 rounded transition-colors active:scale-[.97]">
                    <SymbolCross className="size-full group-hover:stroke-3" />
                </PopoverClose>

                <div className="my-2 text-xs">
                    <div className="mt-2 mb-1 pb-2 text-sm text-center border-b border-border">
                        Custom rule parts
                    </div>

                    <ScrollArea className="h-72">
                        <RulesHelpBody />
                    </ScrollArea>
                </div>

                <PopoverArrorWoBottom className="fill-background stroke-border" />
            </PopoverContent>

        </Popover>
    );
}

function HelpTrigger() {
    return (
        <PopoverTrigger asChild>
            <Button className={inlineButtonClasses} size="sm" tabIndex={-1} title="Rules explanation">
                ?
            </Button>
        </PopoverTrigger>
    );
}

function RulesHelpBody() {
    return (
        <div className="mb-4 px-2 grid grid-cols-[auto_auto] gap-2">
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
