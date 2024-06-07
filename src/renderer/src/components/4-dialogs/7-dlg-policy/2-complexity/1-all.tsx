import { PolicyDlgConv } from "../0-all/0-conv";
import { FirstRowSection } from "./2-first-row/1-all";
import { CustomRuleSection } from "./3-custom-rule/1-all";

export function SectionRuleTypes({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    return (
        <div className="mt-2 flex flex-col gap-2 select-none">
            <FirstRowSection dlgUiAtoms={dlgUiAtoms} />
            <CustomRuleSection dlgUiAtoms={dlgUiAtoms} />
        </div>
    );
}
