import { type PolicyDlgTypes } from "../../../0-all";
import { RuleExplanation } from "../4-rule-explanation";
import { InputWithCounter } from "../2-input-with-counter";
import { ButtonGenerate } from "../3-button-generate";

export function TestAreaBody({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    return (
        <div className="relative mt-4 px-2 pt-3 pb-1 border-border border rounded flex flex-col gap-0.5">

            <div className="absolute left-0 -top-[9px]">
                Custom rule test area
            </div>

            <div className="mt-1">Test password</div>
            <div className="h-7 flex items-center gap-x-1">
                <InputWithCounter dlgUiCtx={dlgUiCtx} />
                <ButtonGenerate dlgUiCtx={dlgUiCtx} />
            </div>

            <RuleExplanation dlgUiCtx={dlgUiCtx} />
        </div>
    );
}
