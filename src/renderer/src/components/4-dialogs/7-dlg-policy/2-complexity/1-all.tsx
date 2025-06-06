import { type PolicyDlgTypes } from "../0-all";
import { FirstRowSection } from "./2-1st-row-rule-select/1-all";
import { CustomRuleSection } from "./3-2nd-row-custom-rule";

export function SectionRuleTypes({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    return (
        <div className="mt-2 flex flex-col gap-2 select-none">

            <FirstRowSection dlgUiCtx={dlgUiCtx} />
            <CustomRuleSection dlgUiCtx={dlgUiCtx} />

        </div>
    );
}
