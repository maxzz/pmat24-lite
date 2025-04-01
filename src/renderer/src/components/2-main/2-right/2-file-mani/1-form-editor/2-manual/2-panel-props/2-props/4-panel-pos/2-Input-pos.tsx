import { type PrimitiveAtom, useAtomValue } from "jotai";
import { InputWTooltip } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";
import type { RowInputState } from "@/ui";

//import { InputXY } from "./2-input-xy";
// function eventNumber(e: React.ChangeEvent<HTMLInputElement>, defValue: number = 0) {
//     let n = parseInt(e.target.value);
//     if (Number.isNaN(n)) {
//         n = defValue;
//     }
//     return n;
// }

export function InputPos({ valueAtom, label }: { valueAtom: PrimitiveAtom<RowInputState>; label: string; }) {
    const repeat = useAtomValue(valueAtom);
    return (
        <label className="flex flex-col gap-1">
            <span>
                {label}
            </span>

            <div className="max-w-24 flex items-center gap-1" title={`${label} offset from the top-left corner of the window client area`}>
                <InputWTooltip stateAtom={valueAtom} asCheckbox={false} />

                <span className="pt-0.5">
                    px
                </span>
            </div>
        </label>
    );
}
