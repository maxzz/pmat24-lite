import { FC, ReactNode, useState } from "react";
import { useAtomValue } from "jotai";
import { RowInputStateAtom, Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/ui";

type InputBodyProps = {
    stateAtom: RowInputStateAtom;
    children: ReactNode;
    Trigger: FC<{ error: string | undefined; }>;
};

export function InputBody({ stateAtom, children, Trigger }: InputBodyProps) {
    const [openTooltip, setOpenTooltip] = useState(false);

    const state = useAtomValue(stateAtom);

    return (
        <TooltipProvider>
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>

                <div className="relative">
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
