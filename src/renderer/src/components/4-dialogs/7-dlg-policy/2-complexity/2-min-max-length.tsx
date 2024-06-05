import { useAtom } from "jotai";
import { PolicyDlgConv } from "../0-all/0-conv";
import { Input, Label } from "@/ui";
import { OptionInput } from "@/components/2-main/2-right/2-file-mani/1-form-editor/4-options/4-controls/1-options-row/5-option-input";

export function SectionMinMaxLength({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    // const [min, setMin] = useAtom(dlgUiAtoms.minLenAtom);
    // const [max, setMax] = useAtom(dlgUiAtoms.maxLenAtom);
    return (
        <Label className="text-xs space-y-1">
            <div className="">Password length</div>

            <div className="flex items-center space-x-1">
                <div>
                    min
                </div>
                {/* <Input className="px-2 h-8 text-xs max-w-[6ch]" value={`${min}`} onChange={(e) => setMin(+e.target.value)} /> */}
                <OptionInput stateAtom={dlgUiAtoms.minLenAtom} className="px-2 h-8 text-xs max-w-[6ch]" />

                <div>
                    max
                </div>
                {/* <Input className="px-2 h-8 text-xs max-w-[6ch]" value={`${max}`} onChange={(e) => setMax(+e.target.value)} /> */}
                <OptionInput stateAtom={dlgUiAtoms.maxLenAtom} className="px-2 h-8 text-xs max-w-[6ch]" />
            </div>
        </Label>
    );
}
