import { useAtom } from "jotai";
import { nameValuesConstrainPsw } from "@/store/8-manifest";
import { type PolicyDlgTypes } from "../0-all";
import { SelectTm } from "@/ui/local-ui";

export function SectionHistory({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const [selected, setSelected] = useAtom(dlgUiCtx.constrainPswAtom);
    return (
        <div>
            <SelectTm triggerClasses="mt-2 w-fit" items={nameValuesConstrainPsw} value={selected} onValueChange={setSelected} />
        </div>
    );
}
