import { useAtom } from "jotai";
import { namesConstrainPsw } from "@/store/manifest";
import { PolicyDlgConv } from "../0-all";
import { Dropdown } from "../9-constrols";

export function SectionHistory({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const [selected, setSelected] = useAtom(dlgUiAtoms.constrainPswAtom);
    return (
        <div>
            <Dropdown className="mt-2 w-fit" items={namesConstrainPsw} value={selected} onValueChange={setSelected} />
        </div>
    );
}
