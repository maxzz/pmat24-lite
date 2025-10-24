import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "motion/react";
import { BarsLoader, Button } from "@/ui";
import { classNames } from "@/utils";
import { newManiCtx } from "../0-new-mani-ctx";
import { stateNapiBuildMani, napiLock } from "@/store/7-napi-atoms";

export function ProgressBarControlsScan({ className }: { className?: string; }) {

    const showProgressBar = useAtomValue(newManiCtx.showProgressAtom);

    return (<>
        <AnimatePresence>
            {showProgressBar && (
                <motion.div
                    className={classNames("text-xs flex items-center gap-1", className)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { delay: 0 } }}
                    transition={{ duration: 0.7, delay: 2 }}
                >
                    Collecting controls...
                    <BarsLoader className="w-6 h-4 text-orange-500 [--barh:100%] [--framew:4px] [--speed:1s]" title="Refresh windows list" />

                    <Button className={cancelButtonClasses} variant="ghost" size="xs" tabIndex={-1} onClick={() => napiLock.cancel()}>
                        Cancel
                    </Button>

                    <BuildCounter />
                </motion.div>
            )}

        </AnimatePresence>
    </>);
}

function BuildCounter() {
    const { buildCounter } = useSnapshot(stateNapiBuildMani);
    if (buildCounter < 200) {
        return null;
    }
    return (
        <div className="text-xs text-foreground/50">{buildCounter}</div>
    );
}

const cancelButtonClasses = "ml-2 text-white bg-orange-500 hover:text-white hover:bg-orange-600 active:scale-[.97] shadow-sm";
