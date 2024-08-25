import { useAtom, useSetAtom } from "jotai";
import { PolicyDlgConv, type PolicyDlgTypes } from "../../0-all";
import { Dropdown } from "../../9-constrols";
import { Label } from "@/ui";
import { MinMaxInputs } from "./2-min-max";

function RuleSelect({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgTypes.PolicyUiAtoms; }) {

    const setIsCustom = useSetAtom(dlgUiAtoms.isCustomAtom);
    const [selected, setSelected] = useAtom(dlgUiAtoms.constrainSetAtom);
    const setSelected2 = useSetAtom(dlgUiAtoms.constrainSet0Atom);

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
            <Label className="flex-1 text-xs flex flex-col 1items-center">
                <Dropdown items={PolicyDlgConv.chSetRuleNames} value={selected} onValueChange={onValueChange} />
            </Label>
        </div>
    );
}

export function FirstRowSection({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgTypes.PolicyUiAtoms; }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <RuleSelect dlgUiAtoms={dlgUiAtoms} />
            <MinMaxInputs dlgUiAtoms={dlgUiAtoms} />
        </div>
    );
}
