import { type OptionInputWTypeProps } from "./9-types";
import { SymbolWarning } from "@/ui/icons";
import { TooltipShellWithErrorIcon } from "./2-option-input-tooltip-shell";
import { OptionAsString } from "./4-option-string";
import { OptionAsTextarea } from "./5-option-textarea";
import { OptionAsCheckbox } from "./6-option-checkbox";

export function InputOrCheckWithTooltip({ stateAtom, asCheckbox, asTextarea, containerClasses, ...rest }: OptionInputWTypeProps) {
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
