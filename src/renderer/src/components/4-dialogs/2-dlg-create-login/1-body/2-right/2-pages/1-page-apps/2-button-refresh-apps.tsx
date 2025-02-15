import { useState, type ComponentProps } from "react";
import { useSetAtom } from "jotai";
import { newManiCtx } from "../../../0-new-mani-ctx";
import { classNames, delay, useAutoCleanupToast } from "@/utils";
import { Button } from "@/ui/shadcn";
import { IconRefresh } from "@/ui/icons";
import { toast } from "sonner";
import { BarsLoader } from "@/ui";
import { AnimatePresence, motion } from "framer-motion";

export function ButtonReloadApps({ className }: ComponentProps<"button">) {
    const doRefreshApps = useSetAtom(newManiCtx.doRefreshAppsAtom);
    const setToastId = useAutoCleanupToast();

    const [refreshEnabled, setRefreshEnabled] = useState(true);

    async function callUpdateAppsList() {
        if (!refreshEnabled) {
            console.error('updateApps - refresh disabled');
            return;
        }

        setRefreshEnabled(false);
        try {
            await doRefreshApps(); // await delay(3000);
            setToastId(toast('Updated'));
        } catch (error) {
            console.error(`'updateApps' ${error instanceof Error ? error.message : `${error}`}`);
            toast.error(`'updateApps' ${error instanceof Error ? error.message : `${error}`}`);
        }
        setRefreshEnabled(true);
    }

    return (
        <div className="flex items-center gap-3">
            <AnimatePresence>
                {!refreshEnabled &&
                    <motion.div
                        className="flex items-center gap-1"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1.1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <BarsLoader className="w-6 h-4 text-sky-500 [--barh:10%] [--framew:1px]" title="Refresh windows list" />
                        Updating...
                    </motion.div>
                }
            </AnimatePresence>

            <Button
                className={classNames("self-end mr-3", className)} variant="outline" size="xs" tabIndex={-1}
                onClick={callUpdateAppsList}
                disabled={!refreshEnabled}
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
