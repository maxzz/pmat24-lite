import { PrimitiveAtom, useAtom } from "jotai";
import { RowInput } from "./2-row-input";
import { Label } from "@/ui";

export function RowInputWLabel({ valueAtom, label }: { valueAtom: PrimitiveAtom<string>, label: string; }) {
    const [value, setValue] = useAtom(valueAtom);
    return (<>
        <Label className="col-span-2 text-xs">
            <div>
                {label}
            </div>
            <RowInput value={value} onChange={(e) => setValue(e.target.value)} />
        </Label>
    </>);
}
