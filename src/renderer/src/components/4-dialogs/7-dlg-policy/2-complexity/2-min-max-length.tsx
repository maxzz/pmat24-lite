import { useAtom } from "jotai";
import { PolicyDlgConv } from "../0-all/0-conv";
import { Input, Label } from "@/ui";

export function SectionMinMaxLength({ atoms }: { atoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const [min, setMin] = useAtom(atoms.minLenAtom);
    const [max, setMax] = useAtom(atoms.maxLenAtom);
    return (
        <Label className="text-xs space-y-1">
            <div className="">Password length</div>

            <div className="flex items-center space-x-1">
                <div>
                    min
                </div>
                <Input className="px-2 h-8 text-xs max-w-[6ch]" value={`${min}`} onChange={(e) => setMin(+e.target.value)} />

                <div>
                    max
                </div>
                <Input className="px-2 h-8 text-xs max-w-[6ch]" value={`${max}`} onChange={(e) => setMax(+e.target.value)} />
            </div>
        </Label>
    );
}
