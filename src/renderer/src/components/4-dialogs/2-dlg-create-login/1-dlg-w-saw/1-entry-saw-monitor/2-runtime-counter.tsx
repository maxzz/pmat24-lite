import { secondsCounterAtom } from "@/store/4-dialogs";
import { useAtomValue } from "jotai";
import type { ComponentPropsWithoutRef } from "react";

export function RuntimeCounter(props: ComponentPropsWithoutRef<'div'>) {
    const monitorCounter = useAtomValue(secondsCounterAtom);
    if (monitorCounter < 0) {
        return null;
    }
    return (
        <div {...props}>
            {monitorCounter}s
        </div>
    );
}
