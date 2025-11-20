import { AnimatePresence, motion } from "motion/react";
import { BarsLoader } from "@/ui/local-ui";

export function ProgressFeedback({ refreshInProgress }: { refreshInProgress: boolean; }) {
    return (
        <AnimatePresence>
            {refreshInProgress && (
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    <span className="text-[.65rem]">
                        Updating...
                    </span>

                    <BarsLoader className="w-6 h-4 text-sky-500 [--barh:5%] [--framew:1px]" title="Refresh windows list" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
