import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import * as D from "@/ui/shadcn/dialog";
import { Button } from "@/ui/shadcn";
import { IconFilter } from "@/ui/icons";
import { isFilterActiveAtom } from "@/store/5-2-tree-files";
import { filterDialogOpenAtom } from "@/store/4-dialogs-atoms";
import { appShortcuts } from "../../0-global/2-global-shortcuts";
import { DialogFilterBody } from "./2-body";
import { AnimatePresence, motion, type MotionNodeOptions } from "motion/react";

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
    return (
        <D.Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div {...animationProps}>
                 {/* <motion.div initial={false} className="fixed inset-0 bg-background 1bg-sky-300 z-100" {...animationProps}> */}
                    {/* {isOpen && ( */}
                    
                        <D.DialogContent className={dialogContentClasses} noClose hiddenTitle="Files filter" overlayClasses={overlayClasses}>

                            <DialogFilterBody setIsOpen={setIsOpen} />

                        </D.DialogContent>
                    
                    {/* )} */}
                </motion.div>
            )}
        </AnimatePresence>
        </D.Dialog>
    );
}

const animationProps: MotionNodeOptions = {
    initial: { opacity: 0, scale: 0.75, transition: { delay: .2, duration: 2.2 }  },
    animate: { opacity: 1, scale: 1, transition: { duration: 2 } },
    // exit: { opacity: 0, scale: 0.75, transition: { delay: .2, duration: .2 } },
    exit: { opacity: 0, scale: 0.75, transition: { duration: 0 } }, //TODO: do we need 'exit' animation and AnimatePresence here?
};
