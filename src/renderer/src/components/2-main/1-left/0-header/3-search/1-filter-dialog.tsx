import { useState } from "react";
import { Button } from "@/ui/shadcn";
import * as D from "@/ui/shadcn";
import { useKey } from "react-use";
import { DialogFilterBody } from "./2-body";
import { IconFilter, IconSearch } from "@/ui/icons";
import { searchFilterData } from "@/store";
import { useAtom, useAtomValue } from "jotai";

function CurrentFilter() {
    const text = useAtomValue(searchFilterData.textAtom);
    return (
        <div className="flex items-center gap-1">
            <span className="text-xs">{text}</span>
        </div>
    );
}

export function DialogFilterFiles() {
    const [isOpen, setIsOpen] = useState(false);

    useKey((event) => event.ctrlKey && event.key === 'd', (event) => { event.preventDefault(); setIsOpen(true); });

    return (<>
        <CurrentFilter />
        
        <Button className="" variant={"ghost"} onClick={() => setIsOpen(true)} title="Filter files (Ctrl+D)">
            {/* <IconSearch className="p-px size-4" /> */}
            <IconFilter className="p-px size-4" />
        </Button>

        <D.Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <D.DialogContent className="px-3 py-3 !w-4/5 max-w-3xl data-[state=open]:[animation-duration:200ms]" noClose>

                <DialogFilterBody setIsOpen={setIsOpen} />

            </D.DialogContent>
        </D.Dialog>
    </>);
}
