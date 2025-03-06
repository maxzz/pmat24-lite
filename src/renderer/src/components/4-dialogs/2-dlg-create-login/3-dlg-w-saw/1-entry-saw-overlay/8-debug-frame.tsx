import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { Button } from "@/ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { monitorCounterAtom } from "@/store";
import { doMoveToSecondDlgAtom } from "../0-ctx/1-move-to-second-dlg";
import { DebugButtonsForSaw } from "../../8-test-buttons";
import { hasMain } from "@/xternal-to-main";

export function DebugFrame({ className, children, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const doMoveToSecondDlg = useSetAtom(doMoveToSecondDlgAtom);
    if (hasMain()) {
        return (<div className={classNames("relative bg-sky-400/20", className)} {...rest}>{children}</div>);
    }
    return (<>
        <div className={classNames("relative w-[320px] bg-sky-400/20 border-border/30 border shadow rounded-md", className)} {...rest}>

            <div className="absolute left-0 -top-16 py-0.5 w-full text-right border-border/75 border rounded-md shadow opacity-50">
                <DebugButtonsForSaw className="scale-[.74] origin-left" />
            </div>

            <div className="relative px-3 py-3 w-full text-sm border-border/30 border-b flex items-center justify-center select-none">
                Select application

                <Button
                    className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-white hover:bg-red-500" variant="ghost" size="xs" tabIndex={-1}
                    onClick={() => doMoveToSecondDlg({ cancel: true })}
                >
                    <Cross2Icon className="size-4" />
                </Button>
            </div>

            {children}
        </div>
    </>);
}

export function MonitorCounter({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const monitorCounter = useAtomValue(monitorCounterAtom);
    return (
        <div className={classNames(className)} {...rest}>
            {monitorCounter}s
        </div>
    );
}
