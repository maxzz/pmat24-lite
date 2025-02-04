import { useState, type ComponentProps } from "react";
import { useSetAtom } from "jotai";
import { useAutoCleanupToast } from "@/util-hooks";
import { newManiCtx } from "../../../0-new-mani-ctx";
import { classNames } from "@/utils";
import { Button } from "@/ui/shadcn";
import { IconRefresh } from "@/ui/icons";
import { toast } from "sonner";
import { BarsLoader } from "@/ui";

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
            setToastId(toast('Updated'));
        } catch (error) {
            console.error(`'updateApps' ${error instanceof Error ? error.message : `${error}`}`);
            toast.error(`'updateApps' ${error instanceof Error ? error.message : `${error}`}`);
        }
        setRefreshEnabled(true);
    }

    return (
        <Button
            className={classNames("self-end mr-3 flex items-center gap-1", className)} variant="outline" size="xs" tabIndex={-1}
            onClick={updateApps}
            disabled={!refreshEnabled}
            title="Refresh windows list"
        >
            <BarsLoader className="w-12 h-6 text-red-500" title="Refresh windows list" />
            <IconRefresh className="size-3" title="Refresh windows list" />
        </Button>
    );
}
