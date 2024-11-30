import { useAtom } from "jotai";
import { type FceCtx } from "@/store";
import { Button } from "@/ui";
import { IconClose, IconFilter } from "@/ui/icons";
import { classNames } from "@/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const inputClasses = "w-full px-2 h-7 text-xs bg-mani-background border-border border rounded-md";

export function Button_Filter({ fceCtx }: { fceCtx: FceCtx; }) {
    const [showFilter, setShowFilter] = useState(false);

    const [filter, setFilter] = useAtom(fceCtx.filterAtom);

    function onFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFilter({ ...filter, search: e.target.value });
    }

    return (<>
        <div className="pr-1 overflow-hidden">
            <Button
                className={classNames("-mx-1", showFilter && "bg-muted")}
                variant="ghost"
                title="Filter items"
                tabIndex={-1}
                onClick={() => setShowFilter(!showFilter)}
            >
                <IconFilter className="size-4" />
            </Button>

            <AnimatePresence>

                {showFilter && (
                    <motion.div
                        className="1relative flex items-center"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 2.2 }}
                    >
                        <input type="text" className={inputClasses} value={filter.search} onChange={onFilterChange} />

                        <Button
                            className={classNames("-mx-1", showFilter && "bg-muted")}
                            variant="ghost"
                            title="Clear filter"
                            tabIndex={-1}
                            onClick={() => setShowFilter(false)}
                        >
                            <IconClose className="size-4" />
                        </Button>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </>);
}
