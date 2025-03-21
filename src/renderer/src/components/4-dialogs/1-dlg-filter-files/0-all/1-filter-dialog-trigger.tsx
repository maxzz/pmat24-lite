import { useAtom } from "jotai";
import { filterDialogOpenAtom } from "@/store/1-atoms/7-dialogs";
import { shortcutNameFilter } from "../../0-global/2-global-shortcuts";
import { Button } from "@/ui/shadcn";
import * as D from "@/ui/shadcn";
import { IconFilter } from "@/ui/icons";
import { DialogFilterBody } from "./2-body";

export const overlayClasses = "backdrop-blur-[0.5px] bg-background/80";

export function FilterFilesDialogTrigger() {
    const [isOpen, setIsOpen] = useAtom(filterDialogOpenAtom);
    return (<>
        <Button className="flex-none" variant="ghost" onClick={() => setIsOpen(true)} title={`Filter files ${shortcutNameFilter}`}>
            <IconFilter className="p-px size-4" />
        </Button>

        <D.Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <D.DialogContent
                className="px-3 py-3 !w-4/5 max-w-3xl data-[state=open]:[animation-duration:200ms]"
                noClose
                hiddenTitle="Files filter"
                overlayClasses={overlayClasses}
            > {/* container={document.getElementById('portal')} // dialog from select portal will throw warning */}
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
