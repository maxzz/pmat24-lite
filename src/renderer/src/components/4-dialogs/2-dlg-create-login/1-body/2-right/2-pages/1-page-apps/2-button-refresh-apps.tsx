import { useState, type ComponentProps } from "react";
import { useSetAtom } from "jotai";
import { classNames, errorToString, useAutoCleanupToast } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/ui/shadcn";
import { toast } from "sonner";
import { IconRefresh } from "@/ui/icons";
import { newManiCtx } from "../../../0-new-mani-ctx";
import { BarsLoader } from "@/ui";

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
            await doRefreshApps();
            setToastId(toast('Updated'));
        } catch (error) {
            const msg = errorToString(error);
            console.error(`'updateApps' ${msg}`);
            toast.error(`'updateApps' ${msg}`);
        }
        setRefreshEnabled(true);
    }

    return (
        <div className="flex items-center gap-3">
            <AnimatePresence>
                {!refreshEnabled &&
                    <motion.div
                        className="flex flex-col items-center"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1.1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <span className="text-[.65rem]">Updating...</span>
                        <BarsLoader className="w-6 h-4 text-sky-500 [--barh:5%] [--framew:1px]" title="Refresh windows list" />
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
