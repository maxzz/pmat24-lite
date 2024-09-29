import { type FC, type ReactNode, useState } from "react";
import { useAtomValue } from "jotai";
import { type RowInputStateAtom, Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/ui";

type InputBodyProps = {
    stateAtom: RowInputStateAtom;
    children: ReactNode;
    Trigger: FC<{ error: string | undefined; }>;
};

export function OptionInputTooltipShell({ stateAtom, children, Trigger }: InputBodyProps) {
    const state = useAtomValue(stateAtom);
    const [openTooltip, setOpenTooltip] = useState(false);
    return (
        <TooltipProvider>
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>

                <div className="relative w-full">
                    {children}

                    <TooltipTrigger asChild>
                        <div>
                            <Trigger error={state.error} />
                        </div>
                    </TooltipTrigger>
                </div>

                {state.error && state.touched && (
                    <TooltipPortal container={document.getElementById("portal")}>
                        <TooltipContent align="end" sideOffset={-2}>
                            {state.error}
                        </TooltipContent>
                    </TooltipPortal>
                )}

            </Tooltip>
        </TooltipProvider>
    );
}
