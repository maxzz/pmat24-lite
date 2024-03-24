import { useAtom } from "jotai";
import { optionsDialogOpenAtom } from "@/store/atoms/8-dialogs";
import { Button } from "@/ui";
import * as D from "@/ui/shadcn/dialog";
import { DialogOptionsBody } from "./1-body";

export function OptionsFilesDialog() {
    const [optionsDialogOpen, setOptionsDialogOpen] = useAtom(optionsDialogOpenAtom);

    // useKey((event) => event.ctrlKey && event.key === 'd', (event) => { event.preventDefault(); setOptionsDialogOpen(true); });

    return (<>
        {/* <Button className="" variant={"ghost"} onClick={() => setOptionsDialogOpen(true)} title="Filter files (Ctrl+D)">
            {/* <IconSearch className="p-px size-4" /> * /}
            {/* <IconFilter className="p-px size-4" /> * /}
            Open
        </Button> */}

        <D.Dialog open={optionsDialogOpen} onOpenChange={() => setOptionsDialogOpen(false)}>
            <D.DialogContent className="px-3 py-3 !w-4/5 max-w-3xl data-[state=open]:[animation-duration:200ms]" noClose>

                <DialogOptionsBody setIsOpen={setOptionsDialogOpen} />

            </D.DialogContent>
        </D.Dialog>
    </>);
}
