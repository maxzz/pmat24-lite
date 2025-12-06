import { useAtom } from "jotai";
import { AnimatePresence, motion } from "motion/react";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as D from "@/ui/shadcn/dialog";

import { filterDialogOpenAtom } from "@/store/4-dialogs-atoms";
import { DialogFilterBody } from "./3-body";

export function DialogFilterFilesRenderer() {
    const [isOpen, setIsOpen] = useAtom(filterDialogOpenAtom);
    return (
        <D.Dialog open={isOpen} onOpenChange={setIsOpen}>
            <AnimatePresence>
                {isOpen && (
                    <D.DialogPortal forceMount>
                        <DialogPrimitive.Overlay asChild>
                            <motion.div
                                className={overlayClasses2}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                        </DialogPrimitive.Overlay>

                        <DialogPrimitive.Content asChild>
                            <motion.div
                                className={contentClasses}
                                initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-48%" }}
                                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                                exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-48%" }}
                                transition={{ duration: 0.2 }}
                            >
                                <DialogPrimitive.Title className="sr-only">Files filter</DialogPrimitive.Title>
                                <D.DialogDescription className="sr-only"></D.DialogDescription>
                                
                                <DialogFilterBody setIsOpen={setIsOpen} />
                            </motion.div>
                        </DialogPrimitive.Content>
                    </D.DialogPortal>
                )}
            </AnimatePresence>
        </D.Dialog>
    );
}

const overlayClasses2 = "fixed inset-0 z-50 backdrop-blur-[0.5px] bg-background/80";
const contentClasses = "fixed left-[50%] top-[50%] z-50 grid w-4/5! max-w-3xl gap-4 border bg-background px-3 py-3 shadow-lg sm:rounded-lg";

//TODO: multiple prefixes; now only one effective
//TODO: add (15 last) prefixes history dropdown

//TODO: icons const instances
//TODO: filename for win apps
//TODO: tree custom leafs
//TODO: options page
