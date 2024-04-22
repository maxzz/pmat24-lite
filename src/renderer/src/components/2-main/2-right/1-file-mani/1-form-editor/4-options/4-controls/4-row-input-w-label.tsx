import { PrimitiveAtom, useAtom } from "jotai";
import { RowInput } from "./2-row-input";
import { Label } from "@/ui";

export function RowInputWLabel({ valueAtom, label }: { valueAtom: PrimitiveAtom<string>, label: string; }) {
    const [value, setValue] = useAtom(valueAtom);
    return (<>
        <Label className="grid grid-cols-subgrid col-span-2 items-center text-xs font-light">
            <div className="">
                {label}
            </div>
            <RowInput value={value} onChange={(e) => setValue(e.target.value)} />
        </Label>
    </>);
}

//TODO: validate value, show error tooltip, and sub-grid
