import { PrimitiveAtom, useAtom } from "jotai";
import { Popover, PopoverArrorWoBottom, PopoverClose, PopoverContent, PopoverPortal, PopoverTrigger, ScrollArea } from "@/ui";
import { SymbolCross } from "@/ui/icons";
import { GeneratedListBody } from "./3-body";
import React from "react";

export function ButtonGeneratedList({ openAtom }: { openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div />
            </PopoverTrigger>

            <PopoverPortal>
                <PopoverContent className="relative mx-4 p-0 w-auto 1w-[460px] text-foreground bg-background border-border border shadow" sideOffset={5} align="center">

                    <div className="my-3 text-xs">
                        <div className="mb-2 ml-6 mr-12 text-base text-center">
                            50 Generated passwords
                        </div>

                        <ScrollArea className="h-64" fullHeight>
                            <GeneratedListBody />
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
