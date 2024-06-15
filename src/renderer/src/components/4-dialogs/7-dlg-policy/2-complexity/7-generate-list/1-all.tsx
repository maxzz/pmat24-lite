import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { generateListAtom } from "../../0-all";
import { Popover, PopoverArrorWoBottom, PopoverContent, PopoverPortal, PopoverTrigger, ScrollArea } from "@/ui";
import { GeneratedListBody } from "./3-body";

export function ButtonGeneratedList({ openAtom }: { openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    const generateList = useAtomValue(generateListAtom);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div />
            </PopoverTrigger>

            <PopoverPortal>
                <PopoverContent className="relative mx-4 p-0 w-auto 1w-[460px] text-foreground bg-background border-border border shadow" sideOffset={5} align="center">

                    <div className="1my-3 text-xs">
                        <div className="mb-2 py-4 text-base text-center bg-muted rounded-t overflow-hidden">
                            {generateList.length} generated passwords
                        </div>

                        <ScrollArea className="h-64" fullHeight>
                            <GeneratedListBody generateList={generateList} />
                        </ScrollArea>
                    </div>

                    <PopoverArrorWoBottom className="fill-muted stroke-border" />
                </PopoverContent>
            </PopoverPortal>

        </Popover>
    );
}
