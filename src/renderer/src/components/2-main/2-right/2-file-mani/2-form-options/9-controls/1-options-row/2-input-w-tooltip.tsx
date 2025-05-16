import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { SymbolWarning } from "@/ui/icons";
import { type OptionInputWTypeProps, OptionInputTooltipShell, OptionCheckbox, OptionString } from "@/ui";

export function InputWTooltip({ stateAtom, asCheckbox, containerClasses, ...rest }: OptionInputWTypeProps) {
    return (
        <OptionInputTooltipShell stateAtom={stateAtom} Trigger={TooltipTrigger} containerClasses={containerClasses}>
            {asCheckbox
                ? <OptionCheckbox stateAtom={stateAtom} {...rest} />
                : <OptionString stateAtom={stateAtom} {...rest} />
            }
        </OptionInputTooltipShell>
    );
}

function TooltipTrigger({ error, className }: { error: string | undefined; } & ComponentPropsWithoutRef<'svg'>) {
    return (<>
        {error && (
            <SymbolWarning className={classNames(SymbolWarningClasses, className)} />
        )}
    </>);
}

const SymbolWarningClasses = "absolute mt-px mr-px right-3 top-1/2 transform -translate-y-1/2 size-4 text-red-500/90";
