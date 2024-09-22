import { useAtom } from "jotai";
import { namesConstrainPsw } from "@/store/manifest";
import { type PolicyDlgTypes } from "../0-all";
import { Dropdown } from "../9-constrols";

export function SectionHistory({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const [selected, setSelected] = useAtom(dlgUiCtx.constrainPswAtom);
    return (
        <div>
            <Dropdown className="mt-2 w-fit" items={namesConstrainPsw} value={selected} onValueChange={setSelected} />
        </div>
    );
}
