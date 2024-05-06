import { PrimitiveAtom, atom } from "jotai";
import { RowInputState, RowInputWAtom } from "./1-row-input";
import { useState } from "react";

function validateError(value: string) {
    return value === '111' ? '' : `Value ${value} is invalid, should be 111`;
}

export function RowInputWLabel({ label, valueAtom }: { label: string; valueAtom: PrimitiveAtom<string>; }) {

    const stateAtom = useState(() => atom<RowInputState>({
        data: 'value',
        dirty: false,
        error: undefined,
        touched: undefined,
        validate: validateError,
    }))[0];

    return (
        <RowInputWAtom label={label} stateAtom={stateAtom} />
    );
}
