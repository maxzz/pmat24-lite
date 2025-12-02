import { useAtom } from "jotai";
import { namesConstrainPsw, nameValuesConstrainPsw } from "@/store/manifest";
import { type PolicyDlgTypes } from "../0-all";
import { NunDropdown } from "../9-constrols";
import { Dropdown5, SelectTm } from "@/ui/local-ui";

export function SectionHistory({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const [selected, setSelected] = useAtom(dlgUiCtx.constrainPswAtom);
    return (
        <div>
            <SelectTm triggerClasses="mt-2 w-fit" items={nameValuesConstrainPsw} value={selected} onValueChange={setSelected} />
        </div>
    );
}
