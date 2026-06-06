import { useAtomValue } from "jotai";
import type { ComponentPropsWithoutRef } from "react";
import { secondsCounterAtom } from "../a-create-dialog-atoms/7-1-do-monitoring-w-napi";

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
