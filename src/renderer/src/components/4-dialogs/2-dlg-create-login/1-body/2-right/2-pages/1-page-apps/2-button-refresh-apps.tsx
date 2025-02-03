import { type ComponentProps } from "react";
import { useSetAtom } from "jotai";
import { useAutoCleanupToast } from "@/util-hooks";
import { newManiCtx } from "../../../0-new-mani-ctx";
import { classNames } from "@/utils";
import { Button } from "@/ui/shadcn";
import { IconRefresh } from "@/ui/icons";
import { toast } from "sonner";

export function ButtonReloadApps({ className }: ComponentProps<"button">) {
    const doRefreshApps = useSetAtom(newManiCtx.doRefreshAppsAtom);
    const setToastId = useAutoCleanupToast();

    function updateApps() {
        doRefreshApps();
        setToastId(toast('Updated'));
    }

    return (
        <Button
            className={classNames("self-end mr-3", className)} variant="outline" size="xs" tabIndex={-1}
            onClick={updateApps}
            title="Refresh windows list"
        >
            <IconRefresh className="size-3" title="Refresh windows list" />
        </Button>
    );
}
