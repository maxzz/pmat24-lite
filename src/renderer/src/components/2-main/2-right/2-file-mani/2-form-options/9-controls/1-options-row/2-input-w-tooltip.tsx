import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { SymbolWarning } from "@/ui/icons";
import { type OptionInputWTypeProps, TooltipShellWithErrorIcon, OptionCheckbox, OptionString } from "@/ui";

export function InputOrCheckWithTooltip({ stateAtom, asCheckbox, containerClasses, ...rest }: OptionInputWTypeProps) {
    return (
        <TooltipShellWithErrorIcon stateAtom={stateAtom} Trigger={TooltipTrigger} containerClasses={containerClasses}>
            {asCheckbox
                ? <OptionCheckbox stateAtom={stateAtom} {...rest} />
                : <OptionString stateAtom={stateAtom} {...rest} />
            }
        </TooltipShellWithErrorIcon>
    );
}

function TooltipTrigger({ error }: { error: string | undefined; }) {
    return (<>
        {error && (
            <SymbolWarning className={SymbolWarningClasses} />
        )}
    </>);
}

const SymbolWarningClasses = "absolute mt-px mr-px right-3 top-1/2 transform -translate-y-1/2 size-4 text-red-500/90";
