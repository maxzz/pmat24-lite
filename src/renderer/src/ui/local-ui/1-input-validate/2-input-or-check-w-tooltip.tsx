// import { type FC, type ReactNode, useState } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type OptionInputWTypeProps } from "./9-types";
// import { SymbolWarning } from "@/ui/icons";
// import { OptionAsString } from "./4-option-string";
// import { OptionAsTextarea } from "./5-option-textarea";
// import { OptionAsCheckbox } from "./6-option-checkbox";
// import { type RowInputStateAtom, Tooltip, TooltipContent, TooltipPortal, TooltipProvider } from "@/ui";
// import { InputErrorPopupMessage } from "./1-in-form-controls";
import { InputOrCheckWithErrorMsg } from "./1-in-form-controls";

export function InputOrCheckWithTooltip({ stateAtom, /*asCheckbox, asTextarea, className,*/ containerClasses, ...rest }: OptionInputWTypeProps) {
    const state = useAtomValue(stateAtom);
    // const hasError = state.error && state.touched;
    // const errorClasses = classNames(hasError && 'outline-offset-[0px] outline-red-500', className);
    return (
        <div className={classNames("relative w-full", containerClasses)}>
            <InputOrCheckWithErrorMsg stateAtom={stateAtom} {...rest} />
            {/* {asCheckbox
                ? <OptionAsCheckbox stateAtom={stateAtom} className={errorClasses} {...rest} />
                : asTextarea
                    ? <OptionAsTextarea stateAtom={stateAtom} className={errorClasses} {...rest} />
                    : <OptionAsString stateAtom={stateAtom} className={errorClasses} {...rest} />
            }

            <InputErrorPopupMessage hasError={!!hasError} error={state.error} /> */}
        </div>
    );
}
/*
function InputOrCheckWithTooltipOld({ stateAtom, asCheckbox, asTextarea, containerClasses, ...rest }: OptionInputWTypeProps) {
    return (
        <TooltipShellWithErrorIcon stateAtom={stateAtom} Trigger={TooltipTrigger} containerClasses={containerClasses}>
            {asCheckbox
                ? <OptionAsCheckbox stateAtom={stateAtom} {...rest} />
                : asTextarea
                    ? <OptionAsTextarea stateAtom={stateAtom} {...rest} />
                    : <OptionAsString stateAtom={stateAtom} {...rest} />
            }
        </TooltipShellWithErrorIcon>
    );
}

function TooltipTrigger({ error }: { error: string | undefined; }) {
    return (<>
        {error && (
            <SymbolWarning className="absolute mt-px mr-px right-3 top-1/2 transform -translate-y-1/2 size-4 text-red-500/90" />
        )}
    </>);
}

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
                    </TooltipTrigger> * /}
                </div>

                {state.error && state.touched && (
                    <TooltipPortal> {/* container={document.getElementById('portal')} // dialog from select portal will throw warning * /}
                        <TooltipContent align="end" sideOffset={-2}>
                            {state.error}
                        </TooltipContent>
                    </TooltipPortal>
                )}

            </Tooltip>
        </TooltipProvider>
    );
}
*/
