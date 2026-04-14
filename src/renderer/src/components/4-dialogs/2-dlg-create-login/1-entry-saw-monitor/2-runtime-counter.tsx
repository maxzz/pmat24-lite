import { useAtomValue } from "jotai";
import type { ComponentPropsWithoutRef } from "react";
import { secondsCounterAtom } from "@/store/4-dialogs-atoms/2-create-dialog-atoms/7-1-do-monitoring";

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
