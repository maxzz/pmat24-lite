import { PrimitiveAtom } from "jotai";
import { RowInputState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputGuard } from "./1-row-guard";

export function RowInputWLabel({ label, stateAtom }: { label: string; stateAtom: PrimitiveAtom<RowInputState>; }) {
    return (
        <RowInputGuard label={label} stateAtom={stateAtom} />
    );
}
