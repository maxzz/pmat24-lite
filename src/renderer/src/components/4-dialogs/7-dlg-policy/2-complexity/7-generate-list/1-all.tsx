import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { GenerateListItem, generateListAtom } from "../../0-all";
import { Button, Popover, PopoverArrorWoBottom, PopoverContent, PopoverPortal, PopoverTrigger, ScrollArea } from "@/ui";
import { GeneratedListBody } from "./3-generated-list-body";
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
                            {open && <GeneratedListBody generatedList={generatedList} />}
                        </ScrollArea>

                        <div className="text-base text-center bg-muted rounded-b select-none overflow-hidden">
                            <Button
                                className="w-full border-0 rounded-t-none active:scale-90"
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

function copyToClipboard(generatedList: GenerateListItem[]) {
    const text = generatedList.map(
        (item, idx) => {
            return `${`${idx + 1}`.padStart(3, ' ')}. ${item.ok ? '✔' : '❌'} ${item.psw}`;
        }
    ).join('\n');
    navigator.clipboard.writeText(text);
}
