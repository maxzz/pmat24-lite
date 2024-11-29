import { useAtomValue, useSetAtom } from "jotai";
import { type FceCtx } from "@/store";
import { Button } from "@/ui";
import { IconFilter, IconTrash, SymbolCode } from "@/ui/icons";
import { classNames } from "@/utils";
import { doDeleteSelectedItemAtom } from "@/store/atoms/4-field-catalogs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const inputClasses = "w-full h-7 text-sm bg-mani-background border-border border rounded-md";

export function Button_Filter({ fceCtx }: { fceCtx: FceCtx; }) {
    const [showFilter, setShowFilter] = useState(false);

    return (<>
        <div className="overflow-hidden">
            <AnimatePresence>
                {showFilter && (
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.2 }}
                    >
                        <input type="text" className={inputClasses} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        <Button
            className={classNames("-mx-1", showFilter && "bg-muted")}
            variant="ghost"
            title="Filter items"
            tabIndex={-1}
            onClick={() => setShowFilter(!showFilter)}
        >
            <IconFilter className="size-4" />
        </Button>
    </>);
}
