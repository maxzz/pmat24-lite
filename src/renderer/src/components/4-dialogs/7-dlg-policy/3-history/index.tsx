import { useAtom } from "jotai";
import { namesConstrainPsw } from "@/store/manifest";
import { type PolicyDlgTypes } from "../0-all";
import { NunDropdown } from "../9-constrols";
import { Dropdown5 } from "@/ui/local-ui";

export function SectionHistory({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const [selected, setSelected] = useAtom(dlgUiCtx.constrainPswAtom);
    return (
        <div>
            <Dropdown5 className="mt-2 w-fit" items={namesConstrainPsw} value={selected} onValueChange={setSelected} />
        </div>
    );
}
