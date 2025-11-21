import { useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { Button } from "@/ui/shadcn";
import { IconFilter } from "@/ui/icons";
import { isFilterActiveAtom } from "@/store/5-2-tree-files";
import { filterDialogOpenAtom } from "@/store/4-dialogs-atoms";
import { appShortcuts } from "../../0-global/2-global-shortcuts";
import { DialogFilterFilesRenderer } from "./2-filter-dialog-renderer";

export function FilterFilesDialogTrigger() {
    const isFilterActive = useAtomValue(isFilterActiveAtom);
    const setIsOpen = useSetAtom(filterDialogOpenAtom);
    const title = `Filter Templates (${appShortcuts.openFilter.text})`;

    return (<>
        <Button className="flex-none" variant="ghost" tabIndex={-1} title={title} onClick={() => setIsOpen(true)}>
            <IconFilter className={classNames("p-px size-4", isFilterActive && filterActiveIconClasses)} />
        </Button>

        <DialogFilterFilesRenderer />
    </>);
}

const filterActiveIconClasses = "text-red-500 fill-red-300 dark:text-red-500/80 dark:fill-red-500/80";

