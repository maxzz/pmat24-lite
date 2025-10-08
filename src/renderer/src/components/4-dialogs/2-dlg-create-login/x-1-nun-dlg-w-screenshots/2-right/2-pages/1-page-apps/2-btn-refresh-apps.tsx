import { useState, type ComponentProps } from "react";
import { useSetAtom } from "jotai";
import { classNames, doAddNextToastIdAtom, errorToString } from "@/utils";
import { motion } from "motion/react";
import { Button } from "@/ui/shadcn";
import { toaster } from "@/ui/local-ui";
import { IconRefresh } from "@/ui/icons";
import { ProgressFeedback } from "./3-btn-refresh-progress";
import { newManiCtx } from "../../../0-new-mani-ctx";

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
            setToastId(toaster.info('Windows list updated'));
        } catch (error) {
            const msg = errorToString(error);
            console.error(`'updateApps' ${msg}`);
            toaster.error(`'updateApps' ${msg}`);
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
                <motion.div layout>
                    <IconRefresh className="size-3" />
                </motion.div>

                {/* <IconRefresh className="size-3" title="Refresh windows list" /> */}
            </Button>
        </div>
    );
}
