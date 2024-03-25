import { useState } from "react";
import { Button } from "@/ui/shadcn";
import * as D from "@/ui/shadcn";
import { useKey } from "react-use";
import { DialogFilterBody } from "./2-body";
import { IconFilter, IconSearch } from "@/ui/icons";
import { filterDialogOpenAtom, shortcutNameFilter } from "@/store/atoms/4-dialogs";
import { useAtom } from "jotai";

export function FilterFilesDialog() {
    const [isOpen, setIsOpen] = useAtom(filterDialogOpenAtom);

    useKey((event) => event.ctrlKey && event.key === 'd', (event) => { event.preventDefault(); setIsOpen(true); });

    return (<>
        <Button className="" variant={"ghost"} onClick={() => setIsOpen(true)} title={`Filter files ${shortcutNameFilter}`}>
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

//TODO: multiple prefixes; now only one effective
//TODO: add (15 last) prefixes history dropdown

//TODO: icons const instances
//TODO: filename for win apps
//TODO: tree custom leafs
//TODO: options page
