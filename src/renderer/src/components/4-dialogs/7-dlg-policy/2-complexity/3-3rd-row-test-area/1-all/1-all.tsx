import { type PolicyDlgTypes } from "../../../0-all";
import { RuleExplanation } from "./4-rule-explanation";
import { InputWithCounter } from "./2-input-with-counter";
import { ButtonGenerate } from "./3-button-generate";
import { ErrorInfo } from "./5-error-info";

export function TestAreaBody({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    return (
        <div className="relative mt-6 px-2 pt-2 pb-1 border-border border rounded flex flex-col gap-0.5">

            <div className="absolute left-0 -top-[19px]">
                Custom rule test area
            </div>

            <div>
                Test password
            </div>

            <div className="h-7 flex items-center gap-x-1">
                <InputWithCounter dlgUiCtx={dlgUiCtx} />
                <ButtonGenerate dlgUiCtx={dlgUiCtx} />
            </div>

            <div className="mt-2">
                <RuleExplanation dlgUiCtx={dlgUiCtx} />

                <ErrorInfo className="font-semibold" errorTextAtom={dlgUiCtx.errorTextAtom} />
            </div>
        </div>
    );
}

//TODO: we show if generated password is valid or not, but we need to show how strong it is as well
