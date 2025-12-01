import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { Label } from "@/ui/shadcn";
import { SelectTm, Dropdown5, InputErrorPopupMessage, OptionAsString } from "@/ui/local-ui";
import { type PolicyDlgTypes, doUpdateExplanationAtom, PolicyDlgConv } from "../../0-all";

export function FirstRowSection({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    return (
        <div className="grid grid-cols-[1fr_auto] gap-x-2" style={{ gridTemplateAreas: "'r11 r12' 'r21 r22' 'r33 r33'" }}>
            <div className="pb-0.5" style={{ gridArea: 'r11' }}>
                Password complexity rule
            </div>

            <div style={{ gridArea: 'r12' }}>
                Password length
            </div>

            <div className="pr-4" style={{ gridArea: 'r21' }}>
                <RuleSelect dlgUiCtx={dlgUiCtx} />
            </div>

            <MinMaxInputs dlgUiCtx={dlgUiCtx} />
        </div>
    );
}

function RuleSelect({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const [selected, setSelected] = useAtom(dlgUiCtx.constrainSetAtom);
    const setCustom = useSetAtom(dlgUiCtx.customAtom);
    const setSelectedPrev = useSetAtom(dlgUiCtx.constrainSet0Atom);
    const setIsCustom = useSetAtom(dlgUiCtx.isCustomAtom);

    function onValueChange(value: string) {
        // const isCustom = +value === PolicyDlgConv.chSetRuleNames.length - 1;
        const isCustom = +value === PolicyDlgConv.chSetRuleNameValues.length - 1;
        if (!isCustom) {
            setSelectedPrev(value);
            setCustom('');
        }
        setIsCustom(isCustom);
        setSelected(value);
    }

    return (
        <Label className="flex-1 text-xs">
            {/* <Dropdown5 className="min-h-7 h-auto" items={PolicyDlgConv.chSetRuleNames} value={selected} onValueChange={onValueChange} /> */}
            {/* <SelectTm triggerClasses="min-h-7 h-auto" items={PolicyDlgConv.chSetRuleNames} value={selected} onValueChange={onValueChange} /> */}
            <SelectTm triggerClasses="min-h-7 h-auto" items={PolicyDlgConv.chSetRuleNameValues} value={selected} onValueChange={onValueChange} />
        </Label>
    );
}

function MinMaxInputs({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const doUpdateExplanation = useSetAtom(doUpdateExplanationAtom);

    function updateExplanation() {
        return doUpdateExplanation({ dlgUiCtx });
    }

    const minAtom = dlgUiCtx.minLenAtom;
    const maxAtom = dlgUiCtx.maxLenAtom;

    const minState = useAtomValue(minAtom);
    const maxState = useAtomValue(maxAtom);
    const hasErrorMin = !!(minState.error && minState.touched);
    const hasErrorMax = !!(maxState.error && maxState.touched);
    
    function errorClasses(hasError: boolean) {
        return classNames("px-2 h-7 text-xs max-w-[6ch]", hasError && 'outline-offset-0 outline-red-500', "text-xs");
    }

    return (<>
        <div className="flex items-center gap-1" style={{ gridArea: 'r22' }}>
            min
            <OptionAsString stateAtom={minAtom} className={errorClasses(hasErrorMin)} onValueStateChange={updateExplanation} />
            max
            <OptionAsString stateAtom={maxAtom} className={errorClasses(hasErrorMax)} onValueStateChange={updateExplanation} />
        </div>

        <div style={{ gridArea: 'r33' }}>
            <InputErrorPopupMessage hasError={hasErrorMin || hasErrorMax} error={minState.error || maxState.error} />
        </div>
    </>);
}
