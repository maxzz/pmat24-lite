import { useAtom } from "jotai";
import { PolicyUiAtoms } from "../0-all/0-create-ui-atoms";
import { namesConstrainPsw } from "@/store/manifest";
import { Dropdown } from "../9-constrols";

export function SectionHistory({ atoms }: { atoms: PolicyUiAtoms; }) {
    const [selected, setSelected] = useAtom(atoms.constrainsPswAtom);
    return (
        <div>
            <Dropdown items={namesConstrainPsw} value={selected} onValueChange={setSelected} />
        </div>
    );
}
