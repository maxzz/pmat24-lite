import { Atomize } from "@/util-hooks";
import { namesConstrainPsw } from "@/store/manifest";
import { PolicyUiForAtoms } from "../0-all/0-create-ui-atoms";
import { Dropdown } from "../4-constrols";

export function SectionHistory({ atoms }: { atoms: Atomize<PolicyUiForAtoms>; }) {
    return (
        <div>
            <Dropdown items={namesConstrainPsw} valueAtom={atoms.constrainsPswAtom} />
        </div>
    );
}
