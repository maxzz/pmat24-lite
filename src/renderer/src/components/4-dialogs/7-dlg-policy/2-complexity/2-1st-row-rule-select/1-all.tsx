import { useAtom, useSetAtom } from "jotai";
import { type PolicyDlgTypes, doUpdateExplanationAtom, PolicyDlgConv } from "../../0-all";
import { Dropdown5, Label } from "@/ui";
import { TooltipShellWithErrorIcon, OptionAsString } from "@/ui";
import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { SymbolWarning } from "@/ui/icons";

export function FirstRowSection({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    return (
        <div className="">
            <div className="flex items-center justify-between gap-4">

                <RuleSelect dlgUiCtx={dlgUiCtx} />
                <MinMaxInputs dlgUiCtx={dlgUiCtx} />

            </div>
        </div>
    );
}

function RuleSelect({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {

    const setIsCustom = useSetAtom(dlgUiCtx.isCustomAtom);
    const [selected, setSelected] = useAtom(dlgUiCtx.constrainSetAtom);
    const setSelected2 = useSetAtom(dlgUiCtx.constrainSet0Atom);

    function onValueChange(value: string) {
        const isCustom = +value === PolicyDlgConv.chSetRuleNames.length - 1;
        if (!isCustom) {
            setSelected2(value);
        }
        setIsCustom(isCustom);
        setSelected(value);
    }

    return (
        <div className="flex-1 space-y-1">
            <div>
                Password complexity rule
            </div>
            <Label className="flex-1 text-xs">
                <Dropdown5 items={PolicyDlgConv.chSetRuleNames} value={selected} onValueChange={onValueChange} className="min-h-7 h-auto" />
            </Label>
        </div>
    );
}

function MinMaxInputs({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const doUpdateExplanation = useSetAtom(doUpdateExplanationAtom);
    const updateExplanation = () => doUpdateExplanation({ dlgUiCtx });
    return (
        <div className="text-xs space-y-1">
            <div className="">Password length</div>

            <div className="flex items-center gap-x-1">
                <div>
                    min
                </div>

                <TooltipShellWithErrorIcon stateAtom={dlgUiCtx.minLenAtom} Trigger={MinMaxTrigger}>
                    <OptionAsString
                        className="px-2 h-7 text-xs max-w-[6ch]"
                        stateAtom={dlgUiCtx.minLenAtom}
                        onValueStateChange={updateExplanation}
                    />
                </TooltipShellWithErrorIcon>

                <div>
                    max
                </div>

                <TooltipShellWithErrorIcon stateAtom={dlgUiCtx.maxLenAtom} Trigger={MinMaxTrigger}>
                    <OptionAsString
                        className="px-2 h-7 text-xs max-w-[6ch]"
                        stateAtom={dlgUiCtx.maxLenAtom}
                        onValueStateChange={updateExplanation}
                    />
                </TooltipShellWithErrorIcon>
            </div>
        </div>
    );
}

function MinMaxTrigger({ error, className }: HTMLAttributes<SVGSVGElement> & { error: string | undefined; }) {
    return (<>
        {error && (
            <SymbolWarning className={classNames("absolute right-0.5 top-2 transform -translate-y-1/2 size-3 text-red-500/90", className)} />
        )}
    </>);
}
