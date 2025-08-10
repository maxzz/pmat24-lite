import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { classNames } from "@/utils";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/ui";
import { IconClose, IconFilter } from "@/ui/icons";
import { type FceCtx } from "@/store/1-atoms/4-field-catalogs";

const inputClasses = "w-full px-2 h-7 text-xs bg-mani-background border-border border rounded-md";

export function Button_Filter({ fceCtx }: { fceCtx: FceCtx; }) {
    const [showFilter, setShowFilter] = useState(false);

    const [filter, setFilter] = useAtom(fceCtx.filterAtom);

    function onFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFilter({ ...filter, search: e.target.value });
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(
        () => {
            let timeout: ReturnType<typeof setTimeout>;

            if (showFilter && inputRef.current) {
                timeout = setTimeout(() => inputRef.current?.focus(), 700);
            }

            return () => clearTimeout(timeout);
        }, [showFilter]
    );

    return (<>
        <div className="pr-1 overflow-hidden flex items-center gap-2">
            <motion.div
                layout
            >
                <Button
                    className={classNames("-mx-1", showFilter && "bg-muted")}
                    variant="ghost"
                    title="Filter items"
                    tabIndex={-1}
                    onClick={() => setShowFilter(!showFilter)}
                >
                    <IconFilter className="size-4" />
                </Button>
            </motion.div>

            <AnimatePresence>

                {showFilter && (
                    <motion.div
                        className="relative flex items-center gap-1"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.2 }}
                    >
                        <input ref={inputRef} type="text" className={inputClasses} value={filter.search} onChange={onFilterChange} />

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
