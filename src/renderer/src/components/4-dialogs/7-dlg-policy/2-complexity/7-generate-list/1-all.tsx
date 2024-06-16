import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { generateListAtom } from "../../0-all";
import { Button, Popover, PopoverArrorWoBottom, PopoverContent, PopoverPortal, PopoverTrigger, ScrollArea } from "@/ui";
import { GeneratedListBody, copyToClipboard } from "./3-generated-list-body";
import { IconCopy } from "@/ui/icons";

export function ButtonGeneratedList({ openAtom }: { openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    const generatedList = useAtomValue(generateListAtom);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div />
            </PopoverTrigger>

            <PopoverPortal>
                <PopoverContent className="relative mx-4 p-0 w-auto min-w-52 text-foreground bg-background border-border border shadow" sideOffset={5} align="center">

                    <div className="text-xs">
                        <div className="p-4 text-base text-center bg-muted rounded-t select-none overflow-hidden">
                            {generatedList.length} generated passwords
                        </div>

                        <ScrollArea className="my-2 h-64" fullHeight>
                            {open && (
                                <GeneratedListBody generatedList={generatedList} />
                            )}
                        </ScrollArea>

                        <div className="text-base text-center bg-muted rounded-b select-none overflow-hidden">
                            <Button
                                className="w-full h-10 border-0 rounded-t-none active:scale-90"
                                title="Copy all generated passwords to clipboard"
                                onClick={() => copyToClipboard(generatedList)}
                            >
                                <IconCopy className="size-4" />
                            </Button>
                        </div>

                    </div>

                    <PopoverArrorWoBottom className="fill-muted stroke-border" />
                </PopoverContent>
            </PopoverPortal>

        </Popover>
    );
}

//TODO: optional: add a button to regenerate the list
//TODO: optional: add a button to change the number of passwords to generate
