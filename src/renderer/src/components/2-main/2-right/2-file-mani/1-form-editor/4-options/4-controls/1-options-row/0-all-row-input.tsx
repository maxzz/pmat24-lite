import { useState } from "react";
import { PrimitiveAtom, atom } from "jotai";
import { RowInputState } from "./9-types";
import { RowInputGuard } from "./1-row-guard";

function validateError(value: string) {
    return value === '111' ? '' : `Value ${value} is invalid, should be 111`;
}

export function RowInputWLabel({ label, stateAtom }: { label: string; stateAtom: PrimitiveAtom<RowInputState>; }) {

    // const stateAtom = useState(() => atom<RowInputState>({
    //     type: 'string',
    //     data: 'value',
    //     initialData: 'value',
    //     dirty: false,
    //     error: undefined,
    //     touched: undefined,
    //     validate: validateError,
    // }))[0];

    return (
        <RowInputGuard label={label} stateAtom={stateAtom} />
    );
}
