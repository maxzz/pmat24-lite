import { useState, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { toaster } from "@/ui/local-ui";

/**
 * Cleans up toast when component unmounts, as useal for dialogs
 */
export function useAutoCleanupToast() {
    const toastIdAtom = useState(() => atom<string | number | undefined>(undefined))[0];
    const [toastId, setToastId] = useAtom(toastIdAtom);

    useEffect(() => () => { toastId && toaster.dismiss(toastId); }, [toastId]);

    return setToastId;
}
