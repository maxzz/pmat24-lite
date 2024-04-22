import { PrimitiveAtom } from "jotai";
import { Label, Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/ui";
import { RowInputWAtom } from "./2-row-input-w-atom";

export function RowInputWLabel({ label, valueAtom }: { label: string; valueAtom: PrimitiveAtom<string>; }) {
    return (<>
        <Label className="grid grid-cols-subgrid col-span-2 items-center text-xs font-light">
            <div className="">
                {label}
            </div>
            <RowInputWAtom valueAtom={valueAtom} />
        </Label>
    </>);
}

//TODO: validate value, show error tooltip
