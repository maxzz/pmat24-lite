import { useState, useEffect, type ComponentProps } from "react";
import { atom, useAtom } from "jotai";
import { classNames } from "@/utils";
import { Button } from "@/ui/shadcn";
import { IconRefresh } from "@/ui/icons";
import { toast } from "sonner";

export function ButtonReloadApps({ className }: ComponentProps<"button">) {
    const toastIdAtom = useState(() => atom<string | number | undefined>(undefined))[0];
    const [toastId, setToastId] = useAtom(toastIdAtom);

    useEffect(() => () => { toastId && toast.dismiss(toastId); }, [toastId]);

    return (
        <Button
            className={classNames("self-end mr-3", className)} variant="outline" size="xs" tabIndex={-1}
            onClick={() => setToastId(toast('Updated'))}
            title="Refresh windows list"
        >
            <IconRefresh className="size-3" title="Refresh windows list" />
        </Button>
    );
}
