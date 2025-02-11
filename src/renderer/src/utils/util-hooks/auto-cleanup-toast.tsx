import { useState, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { toast } from "sonner";

/**
 * Cleans up toast when component unmounts, as useal for dialogs
 */
export function useAutoCleanupToast() {
    const toastIdAtom = useState(() => atom<string | number | undefined>(undefined))[0];
    const [toastId, setToastId] = useAtom(toastIdAtom);

    useEffect(() => () => { toastId && toast.dismiss(toastId); }, [toastId]);

    return setToastId;
}
