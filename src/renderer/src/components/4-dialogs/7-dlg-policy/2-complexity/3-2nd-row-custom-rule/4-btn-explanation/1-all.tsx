import { Fragment } from "react";
import { Popover, PopoverArrorWoBottom, PopoverClose, PopoverContent, ScrollArea } from "@/ui";
import { Button, PopoverTrigger } from "@/ui";
import { SymbolCross } from "@/ui/icons";
import { inlineButtonClasses } from "../8-inline-styles";
import { helpRules } from "./9-explanation-rules-text";

export function ButtonRulesHelp() {
    return (
        <Popover modal>
            <PopoverTrigger asChild>
                <Button className={inlineButtonClasses} size="sm" tabIndex={-1} title="Rules explanation">
                    ?
                </Button>
            </PopoverTrigger>

            <PopoverContent className="relative mx-4 p-0 w-[380px] text-foreground bg-background border-border border shadow-sm" sideOffset={5} align="center">

                <PopoverClose className="group absolute size-7 p-2 top-1 right-1.5 hover:stroke-2 hover:text-white hover:bg-red-500 rounded transition-colors active:scale-[.97]">
                    <SymbolCross className="size-full group-hover:stroke-3" />
                </PopoverClose>

                <div className="my-2 text-xs">
                    <div className="ml-4 mt-2 mb-1 pb-2 text-sm font-semibold border-b border-border select-none">
                        Parts of the custom rule
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

function RulesHelpBody() {
    return (
        <div className="mb-4 px-2 grid grid-cols-[auto_auto] gap-2">
            {helpRules.map(
                (rule, idx) => (
                    <Fragment key={idx}>
                        <div className="text-center font-bold">
                            {rule.c1}
                        </div>

                        <div className="mr-3">
                            {rule.c2}
                        </div>
                    </Fragment>
                )
            )}
        </div>
    );
}
