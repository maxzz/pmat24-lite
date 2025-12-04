import { type PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { Button, Popover, PopoverArrorWoBottom, PopoverContent, PopoverPortal, PopoverTrigger, ScrollArea } from "@/ui";
import { IconCopy } from "@/ui/icons";
import { getGenNPasswordsListAtom } from "../../../0-all";
import { GeneratedListBody, copyToClipboard } from "./3-generated-list-body";

export function ButtonGeneratedList({ openAtom }: { openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div />
            </PopoverTrigger>

            <PopoverPortal>
                <PopoverContent className="relative mx-4 p-0 w-auto min-w-52 text-foreground bg-background border-border border shadow-sm" sideOffset={5} align="center">

                    <ListBody open={open} />
                    <PopoverArrorWoBottom className="fill-muted stroke-border" />

                </PopoverContent>
            </PopoverPortal>
        </Popover>
    );
}

function ListBody({ open }: { open: boolean; }) {
    const getGenNPasswordsList = useAtomValue(getGenNPasswordsListAtom);
    return (
        <div className="text-xs">
            <div className="p-2 text-xs font-semibold text-center bg-muted rounded-t select-none overflow-hidden">
                {getGenNPasswordsList.length} generated passwords
            </div>

            <ScrollArea className="my-2 h-64" fullHeight horizontal>
                {open && (
                    <GeneratedListBody generatedList={getGenNPasswordsList} />
                )}
            </ScrollArea>

            <div className="text-center bg-muted rounded-b select-none overflow-hidden">
                <Button
                    className="w-full h-8 border-0 rounded-t-none active:scale-90"
                    title="Copy all generated passwords to clipboard"
                    onClick={() => copyToClipboard(getGenNPasswordsList)}
                >
                    <IconCopy className="size-4" />
                    Copy
                </Button>
            </div>

        </div>
    );
}

//TODO: optional: add a button to regenerate the list
//TODO: optional: add a button to change the number of passwords to generate
//TODO: optional: show failed passwords first
