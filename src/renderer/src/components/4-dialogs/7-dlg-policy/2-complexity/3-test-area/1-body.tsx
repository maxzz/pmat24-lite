import { PolicyDlgConv } from "../../0-all";
import { RuleExplanation } from "./4-rule-explanation";
import { InputWithCounter } from "./2-input-with-counter";
import { ButtonGenerate } from "./3-button-generate";

export function TestAreaBody({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    return (
        <div className="relative mt-4 px-4 pt-3 pb-1 border-border border rounded flex flex-col">

            <div className="absolute left-0 -top-[9px] font-semibold">
                Test area
            </div>

            <div>
                <div className="">Test password</div>
                <div className="h-8 flex items-center space-x-2">
                    <InputWithCounter dlgUiAtoms={dlgUiAtoms} />
                    <ButtonGenerate dlgUiAtoms={dlgUiAtoms} />
                </div>
            </div>

            <RuleExplanation dlgUiAtoms={dlgUiAtoms} />
        </div>
    );
}
