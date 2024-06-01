import { useAtom } from "jotai";
import { PolicyDlgConv } from "../0-all/0-conv";
import { namesConstrainPsw } from "@/store/manifest";
import { Dropdown } from "../9-constrols";

export function SectionHistory({ atoms }: { atoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const [selected, setSelected] = useAtom(atoms.constrainsPswAtom);
    return (
        <div>
            <Dropdown className="mt-2 w-fit" items={namesConstrainPsw} value={selected} onValueChange={setSelected} />
        </div>
    );
}
