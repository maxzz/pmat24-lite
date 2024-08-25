import { useAtom } from "jotai";
import { namesConstrainPsw } from "@/store/manifest";
import { type PolicyDlgTypes } from "../0-all";
import { Dropdown } from "../9-constrols";

export function SectionHistory({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgTypes.PolicyUiAtoms; }) {
    const [selected, setSelected] = useAtom(dlgUiAtoms.constrainPswAtom);
    return (
        <div>
            <Dropdown className="mt-2 w-fit" items={namesConstrainPsw} value={selected} onValueChange={setSelected} />
        </div>
    );
}
