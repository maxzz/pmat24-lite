import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { type PolicyDlgTypes, doUpdateExplanationAtom, PolicyDlgConv } from "../../0-all";
import { Dropdown5, InputErrorPopupMessage, Label, OptionInputWTypeProps } from "@/ui";
import { TooltipShellWithErrorIcon, OptionAsString } from "@/ui";
import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { SymbolWarning } from "@/ui/icons";

export function FirstRowSection({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    return (
        <div className="">
            <div
                className="grid grid-cols-[1fr_auto_auto] gap-x-2"
                style={{
                    gridTemplateAreas:
                        "\
                    'r11 r12' \
                    'r21 r22' \
                    'r33 r33' \
                    "
                }}
            >
                <div className="pb-0.5" style={{ gridArea: 'r11' }}>
                    Password complexity rule
                </div>
                <div className="" style={{ gridArea: 'r12' }}>
                    Password length
                </div>

                <div className="pr-4" style={{ gridArea: 'r21' }}>
                    <RuleSelect dlgUiCtx={dlgUiCtx} />
                </div>
                {/* <div className="" style={{ gridArea: 'r22' }}>
                    2
                </div> */}

                <MinMaxInputs2 dlgUiCtx={dlgUiCtx} />

                {/* <div className="" style={{ gridArea: 'r33' }}>e2</div> */}
            </div>

            {/* <div className="flex items-center justify-between gap-4">

                <RuleSelect dlgUiCtx={dlgUiCtx} />
                <MinMaxInputs2 dlgUiCtx={dlgUiCtx} />

            </div> */}
        </div >
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
        // <div className="flex-1 gap-y-1">
        //     <div>
        //         Password complexity rule
        //     </div>
        <Label className="flex-1 text-xs">
            <Dropdown5 items={PolicyDlgConv.chSetRuleNames} value={selected} onValueChange={onValueChange} className="min-h-7 h-auto" />
        </Label>
        // </div>
    );
}

function MinMaxInputs({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const doUpdateExplanation = useSetAtom(doUpdateExplanationAtom);
    function updateExplanation() {
        return doUpdateExplanation({ dlgUiCtx });
    }
    return (
        <div className="text-xs gap-y-1">
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

function InputOrCheckWithErrorMsg({ stateAtom, asCheckbox, asTextarea, className, ...rest }: OptionInputWTypeProps) {
    const state = useAtomValue(stateAtom);
    const hasError = state.error && state.touched;
    const errorClasses = classNames(hasError && 'outline-offset-[0px] outline-red-500', className);
    return (<>
        <OptionAsString stateAtom={stateAtom} className={errorClasses} {...rest} />
        <InputErrorPopupMessage hasError={!!hasError} error={state.error} />
    </>);
}

function MinMaxInputs2({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const doUpdateExplanation = useSetAtom(doUpdateExplanationAtom);

    function updateExplanation() {
        return doUpdateExplanation({ dlgUiCtx });
    }

    const minAtom = dlgUiCtx.minLenAtom;
    const maxAtom = dlgUiCtx.maxLenAtom;

    const minState = useAtomValue(minAtom);
    const maxState = useAtomValue(maxAtom);
    const hasErrorMin = minState.error && minState.touched;
    const hasErrorMax = maxState.error && maxState.touched;
    const hasError = hasErrorMin || hasErrorMax;
    const errorMsg = minState.error || maxState.error;
    const errorMinClasses = classNames("px-2 h-7 text-xs max-w-[6ch]", hasErrorMin && 'outline-offset-[0px] outline-red-500', "text-xs");
    const errorMaxClasses = classNames("px-2 h-7 text-xs max-w-[6ch]", hasErrorMax && 'outline-offset-[0px] outline-red-500', "text-xs");

    return (
        <>
            {/* <div className="text-xs gap-y-1"> */}
            {/* <div style={{ gridArea: 'r13' }} className="">Password length</div> */}

            {/* <div className="flex items-center gap-x-1"> */}
            <div className="flex items-center gap-1" style={{ gridArea: 'r22' }}>
                min
                <OptionAsString stateAtom={minAtom} className={errorMinClasses} onValueStateChange={updateExplanation} />
                max
                <OptionAsString stateAtom={maxAtom} className={errorMaxClasses} onValueStateChange={updateExplanation} />
            </div>

            {/* </div> */}
            {/* </div> */}

            <div style={{ gridArea: 'r33' }}>
                <InputErrorPopupMessage hasError={!!hasError} error={errorMsg} />
            </div>
        </>
    );
}
