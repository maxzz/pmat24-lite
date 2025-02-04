import { useState, type ComponentProps } from "react";
import { useSetAtom } from "jotai";
import { useAutoCleanupToast } from "@/util-hooks";
import { newManiCtx } from "../../../0-new-mani-ctx";
import { classNames, delay } from "@/utils";
import { Button } from "@/ui/shadcn";
import { IconRefresh } from "@/ui/icons";
import { toast } from "sonner";
import { BarsLoader } from "@/ui";
import { AnimatePresence, motion } from "framer-motion";

export function ButtonReloadApps({ className }: ComponentProps<"button">) {
    const doRefreshApps = useSetAtom(newManiCtx.doRefreshAppsAtom);
    const setToastId = useAutoCleanupToast();

    const [refreshEnabled, setRefreshEnabled] = useState(true);

    async function updateApps() {
        if (!refreshEnabled) {
            console.error('updateApps - refresh disabled');
            return;
        }

        setRefreshEnabled(false);
        try {
            await doRefreshApps();
            await delay(3000);
            setToastId(toast('Updated'));
        } catch (error) {
            console.error(`'updateApps' ${error instanceof Error ? error.message : `${error}`}`);
            toast.error(`'updateApps' ${error instanceof Error ? error.message : `${error}`}`);
        }
        setRefreshEnabled(true);
    }

    return (
        <Button
            className={classNames("self-end mr-3 flex items-center gap-3", className)} variant="outline" size="xs" tabIndex={-1}
            onClick={updateApps}
            disabled={!refreshEnabled}
            title="Refresh windows list"
        >
            <AnimatePresence>
                {!refreshEnabled &&
                    <motion.div
                        className=""
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1.1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <BarsLoader className="w-12 h-4 text-yellow-700 [--barh:100%]" title="Refresh windows list" />
                    </motion.div>
                }
            </AnimatePresence>

            <motion.div
                layout
            >
                <IconRefresh className="size-3" title="Refresh windows list" />
            </motion.div>

            {/* <IconRefresh className="size-3" title="Refresh windows list" /> */}
        </Button>
    );
}
