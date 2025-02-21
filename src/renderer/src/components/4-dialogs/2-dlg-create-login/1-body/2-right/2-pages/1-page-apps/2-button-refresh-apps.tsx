import { useState, type ComponentProps } from "react";
import { useSetAtom } from "jotai";
import { classNames, doAddNextToastIdAtom, errorToString } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/ui/shadcn";
import { toast } from "sonner";
import { IconRefresh } from "@/ui/icons";
import { newManiCtx } from "../../../0-new-mani-ctx";
import { BarsLoader } from "@/ui";

export function ButtonReloadApps({ className }: ComponentProps<"button">) {
    const doRefreshApps = useSetAtom(newManiCtx.doRefreshAppsAtom);
    const setToastId = useSetAtom(doAddNextToastIdAtom);

    const [refreshInProgress, setRefreshInProgress] = useState(false);

    async function callUpdateAppsList() {
        if (refreshInProgress) {
            return; // It's double protected already by button disabled state
        }

        setRefreshInProgress(true);
        try {
            await doRefreshApps();
            setToastId(toast.info('Windows list updated'));
        } catch (error) {
            const msg = errorToString(error);
            console.error(`'updateApps' ${msg}`);
            toast.error(`'updateApps' ${msg}`);
        }
        setRefreshInProgress(false);
    }

    return (
        <div className="flex items-center gap-3">
            <ProgressFeedback refreshInProgress={refreshInProgress} />

            <Button
                className={classNames("self-end mr-3", className)} variant="outline" size="xs" tabIndex={-1}
                onClick={callUpdateAppsList}
                disabled={refreshInProgress}
                title="Refresh window list"
            >
                <motion.div
                    layout
                >
                    <IconRefresh className="size-3" />
                </motion.div>

                {/* <IconRefresh className="size-3" title="Refresh windows list" /> */}
            </Button>
        </div>
    );
}

function ProgressFeedback({ refreshInProgress }: { refreshInProgress: boolean; }) {
    return (
        <AnimatePresence>
            {refreshInProgress && (
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    <span className="text-[.65rem]">Updating...</span>
                    <BarsLoader className="w-6 h-4 text-sky-500 [--barh:5%] [--framew:1px]" title="Refresh windows list" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
