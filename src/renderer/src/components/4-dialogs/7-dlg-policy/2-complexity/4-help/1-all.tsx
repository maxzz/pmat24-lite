import { Popover, PopoverArrorWoBottom, PopoverClose, PopoverContent, PopoverPortal, ScrollArea } from "@/ui";
import { SymbolCross } from "@/ui/icons";
import { ButtonTrigger } from "./2-trigger";
import { RulesHelpBody } from "./3-body";

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
