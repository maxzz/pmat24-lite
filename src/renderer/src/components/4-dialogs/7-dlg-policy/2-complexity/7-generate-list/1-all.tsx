import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { generateListAtom } from "../../0-all";
import { Popover, PopoverArrorWoBottom, PopoverContent, PopoverPortal, PopoverTrigger, ScrollArea } from "@/ui";
import { GeneratedListBody } from "./3-generated-list-body";

export function ButtonGeneratedList({ openAtom }: { openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    const generateList = useAtomValue(generateListAtom);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div />
            </PopoverTrigger>

            <PopoverPortal>
                <PopoverContent className="relative mx-4 p-0 w-auto min-w-52 text-foreground bg-background border-border border shadow" sideOffset={5} align="center">

                    <div className="text-xs">
                        <div className="p-4 text-base text-center bg-muted rounded-t overflow-hidden">
                            {generateList.length} generated passwords
                        </div>

                        <ScrollArea className="my-2 h-64" fullHeight>
                            {open && <GeneratedListBody generateList={generateList} />}
                        </ScrollArea>
                    </div>

                    <PopoverArrorWoBottom className="fill-muted stroke-border" />
                </PopoverContent>
            </PopoverPortal>

        </Popover>
    );
}
