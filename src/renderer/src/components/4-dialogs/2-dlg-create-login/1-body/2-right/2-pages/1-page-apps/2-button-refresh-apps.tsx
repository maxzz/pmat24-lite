import { useState, useEffect, type ComponentProps } from "react";
import { atom, useAtom, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { Button } from "@/ui/shadcn";
import { IconRefresh } from "@/ui/icons";
import { toast } from "sonner";
import { newManiCtx } from "../../../0-new-mani-ctx";

export function ButtonReloadApps({ className }: ComponentProps<"button">) {
    const doRefreshApps = useSetAtom(newManiCtx.doRefreshAppsAtom);

    // const toastIdAtom = useState(() => atom<string | number | undefined>(undefined))[0];
    // const [toastId, setToastId] = useAtom(toastIdAtom);

    // useEffect(() => () => { toastId && toast.dismiss(toastId); }, [toastId]);

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

function useAutoCleanupToast() {
    const toastIdAtom = useState(() => atom<string | number | undefined>(undefined))[0];
    const [toastId, setToastId] = useAtom(toastIdAtom);

    useEffect(() => () => { toastId && toast.dismiss(toastId); }, [toastId]);

    return setToastId;
}
