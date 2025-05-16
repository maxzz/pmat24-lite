import { type HTMLAttributes } from "react";
import { useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { SymbolWarning } from "@/ui/icons";
import { TooltipShellWithErrorIcon, OptionAsString } from "@/ui";
import { type PolicyDlgTypes, updateExplanationAtom } from "../../0-all";

function MinMaxTrigger({ error, className }: HTMLAttributes<SVGSVGElement> & { error: string | undefined; }) {
    return (<>
        {error && (
            <SymbolWarning className={classNames("absolute right-0.5 top-2 transform -translate-y-1/2 size-3 text-red-500/90", className)} />
        )}
    </>);
}

export function MinMaxInputs({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const doUpdateExplanation = useSetAtom(updateExplanationAtom);
    const updateExplanation = () => doUpdateExplanation({ dlgUiCtx });
    return (
        <div className="text-xs space-y-1">
            <div className="">Password length</div>

            <div className="flex items-center space-x-1">
                <div>
                    min
                </div>

                <TooltipShellWithErrorIcon stateAtom={dlgUiCtx.minLenAtom} Trigger={MinMaxTrigger}>
                    <OptionAsString
                        className="px-2 h-8 text-xs max-w-[6ch]"
                        stateAtom={dlgUiCtx.minLenAtom}
                        onValueStateChange={updateExplanation}
                    />
                </TooltipShellWithErrorIcon>

                <div>
                    max
                </div>

                <TooltipShellWithErrorIcon stateAtom={dlgUiCtx.maxLenAtom} Trigger={MinMaxTrigger}>
                    <OptionAsString
                        className="px-2 h-8 text-xs max-w-[6ch]"
                        stateAtom={dlgUiCtx.maxLenAtom}
                        onValueStateChange={updateExplanation}
                    />
                </TooltipShellWithErrorIcon>
            </div>
        </div>
    );
}
