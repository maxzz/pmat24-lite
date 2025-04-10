import { useAtom, useAtomValue } from "jotai";
import * as D from "@/ui/shadcn";
import { Button } from "@/ui/shadcn";
import { IconFilter } from "@/ui/icons";
import { isFilterActiveAtom } from "@/store";
import { filterDialogOpenAtom } from "@/store/1-atoms/7-dialogs";
import { shortcutNameFilter } from "../../0-global/2-global-shortcuts";
import { DialogFilterBody } from "./2-body";
import { classNames } from "@/utils";

export function FilterFilesDialogTrigger() {

    const [isOpen, setIsOpen] = useAtom(filterDialogOpenAtom);
    const isFilterActive = useAtomValue(isFilterActiveAtom);
    
    return (<>
        <Button className="flex-none" variant="ghost" onClick={() => setIsOpen(true)} title={`Filter files ${shortcutNameFilter}`}>
            <IconFilter className={classNames("p-px size-4", isFilterActive && "text-red-500 fill-red-300 dark:text-red-500/80 dark:fill-red-500/80")} />
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

export const overlayClasses = "backdrop-blur-[0.5px] bg-background/80";

//TODO: multiple prefixes; now only one effective
//TODO: add (15 last) prefixes history dropdown

//TODO: icons const instances
//TODO: filename for win apps
//TODO: tree custom leafs
//TODO: options page
