import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { Button } from "@/ui";
import { IconRadix_Cross2 } from "@/ui/icons/normal";
import { hasMain } from "@/xternal-to-main";
import { doMoveToSecondDlgAtom } from "@/store/4-dialogs-atoms";
import { DebugButtonsForSaw } from "../../8-test-buttons";

export function DebugFrame({ className, children, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const doMoveToSecondDlg = useSetAtom(doMoveToSecondDlgAtom);

    if (hasMain()) {
        return (
            <div className={classNames(electFrameClasses, className)} {...rest}>
                {children}
            </div>
        );
    } else {
        return (
            <div className={classNames(debugFrameClasses, className)} {...rest}>

                <div className="absolute left-0 -top-16 py-0.5 w-full text-right border-border/75 border rounded-md shadow-sm opacity-50">
                    <DebugButtonsForSaw className="scale-[.74] origin-left" />
                </div>

                <div className="relative px-3 py-3 w-full text-sm border-border/30 border-b flex items-center justify-center select-none">
                    Select application

                    <Button
                        className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-white hover:bg-red-500" variant="ghost" size="xs" tabIndex={-1}
                        onClick={() => doMoveToSecondDlg({ cancel: true })}
                    >
                        <IconRadix_Cross2 className="size-4" />
                    </Button>
                </div>

                {children}
            </div>
        );
    }
}

const electFrameClasses = "relative bg-muted/10 1bg-sky-400/20";
const debugFrameClasses = "relative w-80 bg-muted/10 1bg-sky-400/20 border-border/30 border shadow-sm rounded-md";
