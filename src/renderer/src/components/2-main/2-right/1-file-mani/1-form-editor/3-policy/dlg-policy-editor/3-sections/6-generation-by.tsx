import { useAtom } from "jotai";
import { UseAs } from "@/store/manifest";
import { PolicyUiAtoms } from "../0-all/0-create-ui-atoms";
import { Radio } from "../9-constrols";

export function SectionGenerationBy({ atoms }: { atoms: PolicyUiAtoms; }) {
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
