import { useAtomValue } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { BarsLoader, Button } from "@/ui";
import { classNames } from "@/utils";
import { newManiCtx } from "../0-new-mani-ctx";

export function ControlsScanProgressBar({ className }: { className?: string; }) {

    const showProgressBar = useAtomValue(newManiCtx.showControlsScanProgressAtom);

    return (<>
        <AnimatePresence>
            {showProgressBar && (
                <motion.div
                    className={classNames("text-xs flex items-center gap-1", className)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 3.2 }}
                >
                    Collecting controls...
                    <BarsLoader className="w-6 h-4 text-orange-500 [--barh:100%] [--framew:4px] [--speed:1s]" title="Refresh windows list" />

                    <Button className={cancelButtonClasses} variant="ghost" size="xs" tabIndex={-1}> {/* onClick={() => sendToMain({ type: 'cancel-detection' })} */}
                        Cancel
                    </Button>
                </motion.div>
            )}

        </AnimatePresence>
    </>);
}

const cancelButtonClasses = "ml-2 text-white bg-orange-500 hover:text-white hover:bg-orange-600 active:scale-[.97] shadow";
