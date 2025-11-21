import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import * as D from "@/ui/shadcn/dialog";
import { Button } from "@/ui/shadcn";
import { IconFilter } from "@/ui/icons";
import { isFilterActiveAtom } from "@/store/5-2-tree-files";
import { filterDialogOpenAtom } from "@/store/4-dialogs-atoms";
import { appShortcuts } from "../../0-global/2-global-shortcuts";
import { DialogFilterBody } from "./2-body";

export function FilterFilesDialogTrigger() {
    const isFilterActive = useAtomValue(isFilterActiveAtom);
    const setIsOpen = useSetAtom(filterDialogOpenAtom);
    const title = `Filter Templates (${appShortcuts.openFilter.text})`;

    return (<>
        <Button className="flex-none" variant="ghost" tabIndex={-1} title={title} onClick={() => setIsOpen(true)}>
            <IconFilter className={classNames("p-px size-4", isFilterActive && filterActiveIconClasses)} />
        </Button>

        <FilterFilesBody />
    </>);
}

export const overlayClasses = "backdrop-blur-[0.5px] bg-background/80";

const dialogContentClasses = "px-3 py-3 w-4/5! max-w-3xl data-[state=open]:duration-ani-200";
const filterActiveIconClasses = "text-red-500 fill-red-300 dark:text-red-500/80 dark:fill-red-500/80";

//TODO: multiple prefixes; now only one effective
//TODO: add (15 last) prefixes history dropdown

//TODO: icons const instances
//TODO: filename for win apps
//TODO: tree custom leafs
//TODO: options page

export function FilterFilesBody() {
    const [isOpen, setIsOpen] = useAtom(filterDialogOpenAtom);
    return (<>
        <D.Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <D.DialogContent className={dialogContentClasses} noClose hiddenTitle="Files filter" overlayClasses={overlayClasses}>

                <DialogFilterBody setIsOpen={setIsOpen} />

            </D.DialogContent>
        </D.Dialog>
    </>);
}
