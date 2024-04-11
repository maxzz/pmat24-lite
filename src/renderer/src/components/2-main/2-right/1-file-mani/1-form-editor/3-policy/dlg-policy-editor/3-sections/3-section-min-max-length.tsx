import { useAtom } from "jotai";
import { Atomize } from "@/util-hooks";
import { PolicyUi } from "../0-all/0-create-ui-atoms";
import { Input } from "../4-constrols";

export function SectionMinMaxLength({ atoms }: { atoms: Atomize<PolicyUi>; }) {
    const [min, setMin] = useAtom(atoms.minLengthAtom);
    const [max, setMax] = useAtom(atoms.maxLengthAtom);
    return (
        <div className="flex items-center space-x-2">
            <div className="">
                Length:
            </div>
            <Input className="max-w-[6ch]" value={`${min}`} onChange={(e) => setMin(+e.target.value)} />

            <div className="">
                to
            </div>
            <Input className="max-w-[6ch]" value={`${max}`} onChange={(e) => setMax(+e.target.value)} />
        </div>
    );
}
