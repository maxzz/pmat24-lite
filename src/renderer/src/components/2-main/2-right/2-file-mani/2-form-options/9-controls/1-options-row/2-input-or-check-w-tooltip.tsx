import { type OptionInputWTypeProps, TooltipShellWithErrorIcon, OptionAsCheckbox, OptionAsString } from "@/ui";
import { SymbolWarning } from "@/ui/icons";

export function InputOrCheckWithTooltip({ stateAtom, asCheckbox, containerClasses, ...rest }: OptionInputWTypeProps) {
    return (
        <TooltipShellWithErrorIcon stateAtom={stateAtom} Trigger={TooltipTrigger} containerClasses={containerClasses}>
            {asCheckbox
                ? <OptionAsCheckbox stateAtom={stateAtom} {...rest} />
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
