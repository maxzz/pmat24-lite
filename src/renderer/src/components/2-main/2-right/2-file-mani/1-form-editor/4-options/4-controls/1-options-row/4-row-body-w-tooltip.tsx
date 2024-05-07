import { ReactNode, useState } from "react";
import { useAtomValue } from "jotai";
import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/ui";
import { RowInputStateAtom } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowTrigger } from "./3-row-trigger";

export function InputBody({ stateAtom, children }: { stateAtom: RowInputStateAtom; children: ReactNode }) {
    const [openTooltip, setOpenTooltip] = useState(false);

    const state = useAtomValue(stateAtom);

    return (
        <TooltipProvider>
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>

                <div className="relative">
                    {children}

                    <TooltipTrigger asChild>
                        <div>
                            <RowTrigger error={state.error} />
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
