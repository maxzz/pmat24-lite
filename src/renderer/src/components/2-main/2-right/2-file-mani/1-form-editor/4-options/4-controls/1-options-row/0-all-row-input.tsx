import { PrimitiveAtom } from "jotai";
import { RowInputState } from "./9-types";
import { RowInputGuard } from "./1-row-guard";

export function RowInputWLabel({ label, stateAtom }: { label: string; stateAtom: PrimitiveAtom<RowInputState>; }) {
    return (
        <RowInputGuard label={label} stateAtom={stateAtom} />
    );
}
