import { useAtom } from "jotai";
import { Atomize } from "@/util-hooks";
import { UseAs } from "@/store/manifest";
import { PolicyUiForAtoms } from "../0-all/0-create-ui-atoms";
import { Radio } from "../4-constrols";

export function SectionGenerationBy({ atoms }: { atoms: Atomize<PolicyUiForAtoms>; }) {
    const [useAs, setUseUs] = useAtom(atoms.useAsAtom);
    return (
        <div className="grid space-y-2">
            <Radio name="gen-type" checked={useAs === `${UseAs.verify}`} onChange={() => setUseUs(`${UseAs.verify}`)}>
                By user
            </Radio>

            <Radio name="gen-type" checked={useAs === `${UseAs.generate}`} onChange={() => setUseUs(`${UseAs.generate}`)}>
                By system
            </Radio>
        </div>
    );
}
