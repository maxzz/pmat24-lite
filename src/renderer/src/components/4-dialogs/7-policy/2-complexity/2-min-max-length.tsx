import { useAtom } from "jotai";
import { PolicyDlgConv } from "../0-all/0-conv";
import { Input } from "@/ui";

export function SectionMinMaxLength({ atoms }: { atoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const [min, setMin] = useAtom(atoms.minLengthAtom);
    const [max, setMax] = useAtom(atoms.maxLengthAtom);
    return (
        <div className="flex items-center space-x-2">
            <div>
                Length
            </div>

            <Input className="h-8 text-xs max-w-[6ch]" value={`${min}`} onChange={(e) => setMin(+e.target.value)} />

            <div className="">
                to
            </div>

            <Input className="h-8 text-xs max-w-[6ch]" value={`${max}`} onChange={(e) => setMax(+e.target.value)} />
        </div>
    );
}

export function SectionMinMaxLength_Old({ atoms }: { atoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const [min, setMin] = useAtom(atoms.minLengthAtom);
    const [max, setMax] = useAtom(atoms.maxLengthAtom);
    return (
        <div className="flex items-center space-x-2">
            <div>
                Length
            </div>

            <Input className="h-8 text-xs max-w-[6ch]" value={`${min}`} onChange={(e) => setMin(+e.target.value)} />

            <div className="">
                to
            </div>

            <Input className="h-8 text-xs max-w-[6ch]" value={`${max}`} onChange={(e) => setMax(+e.target.value)} />
        </div>
    );
}
