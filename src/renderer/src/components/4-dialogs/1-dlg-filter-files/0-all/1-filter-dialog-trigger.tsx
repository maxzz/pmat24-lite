import { useAtom, useAtomValue } from "jotai";
import { classNames } from "@/utils";
import * as D from "@/ui/shadcn/dialog";
import { Button } from "@/ui/shadcn";
import { IconFilter } from "@/ui/icons";
import { isFilterActiveAtom } from "@/store/5-2-tree-files";
import { filterDialogOpenAtom } from "@/store/4-dialogs-atoms";
import { appShortcuts } from "../../0-global/2-global-shortcuts";
import { DialogFilterBody } from "./2-body";

export function FilterFilesDialogTrigger() {

    const [isOpen, setIsOpen] = useAtom(filterDialogOpenAtom);
    const isFilterActive = useAtomValue(isFilterActiveAtom);

    return (<>
        <Button className="flex-none" variant="ghost" onClick={() => setIsOpen(true)} tabIndex={-1} title={`Filter Templates (${appShortcuts.openFilter.text})`}>
            <IconFilter className={classNames("p-px size-4", isFilterActive && filterActiveIconClasses)} />
        </Button>

        <D.Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <D.DialogContent className={dialogContentClasses} noClose hiddenTitle="Files filter" overlayClasses={overlayClasses}>

                <DialogFilterBody setIsOpen={setIsOpen} />

            </D.DialogContent>
        </D.Dialog>
    </>);
}

export const overlayClasses = "backdrop-blur-[0.5px] bg-background/80";

const dialogContentClasses = "px-3 py-3 w-4/5! max-w-3xl data-[state=open]:[animation-duration:200ms]";
const filterActiveIconClasses = "text-red-500 fill-red-300 dark:text-red-500/80 dark:fill-red-500/80";

//TODO: multiple prefixes; now only one effective
//TODO: add (15 last) prefixes history dropdown

//TODO: icons const instances
//TODO: filename for win apps
//TODO: tree custom leafs
//TODO: options page
