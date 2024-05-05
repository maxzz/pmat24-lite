import { PrimitiveAtom } from "jotai";
import { Label, Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/ui";
import { RowInputWAtom } from "./5-row-input-w-atom";

export function RowInputWLabel({ label, valueAtom }: { label: string; valueAtom: PrimitiveAtom<string>; }) {
    return (
        <RowInputWAtom label={label} valueAtom={valueAtom} />
    );
}

//TODO: validate value, show error tooltip
