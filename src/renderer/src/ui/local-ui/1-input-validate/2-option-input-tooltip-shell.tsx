import { type FC, type ReactNode, useState } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type RowInputStateAtom, Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/ui";

type TooltipShellWithErrorIconProps = {
    stateAtom: RowInputStateAtom;
    children: ReactNode;
    Trigger: FC<{ error: string | undefined; }>;
    containerClasses?: string;
};

export function TooltipShellWithErrorIcon({ stateAtom, children, containerClasses, Trigger }: TooltipShellWithErrorIconProps) {
    const [openTooltip, setOpenTooltip] = useState(false);
    const state = useAtomValue(stateAtom);
    return (
        <TooltipProvider>
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>

                <div className={classNames("relative w-full", containerClasses)}>
                    {children}

                    {/* <TooltipTrigger asChild>
                        <div>
                            {/* <Trigger error={state.error} /> * /}
                            {/* {Trigger ? <Trigger error={state.error} /> : <div className="">no trigger</div> } * /}
                            <div className="">no trigger</div>
                        </div>
                    </TooltipTrigger> */}
                </div>

                {state.error && state.touched && (
                    <TooltipPortal> {/* container={document.getElementById('portal')} // dialog from select portal will throw warning */}
                        <TooltipContent align="end" sideOffset={-2}>
                            {state.error}
                        </TooltipContent>
                    </TooltipPortal>
                )}

            </Tooltip>
        </TooltipProvider>
    );
}
