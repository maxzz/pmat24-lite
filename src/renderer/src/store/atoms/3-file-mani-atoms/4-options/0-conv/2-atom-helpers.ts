import { PrimitiveAtom } from "jotai";
import { RowInputState } from "../19-types";
import { OnValueChange, atomWithCallback } from "@/util-hooks";

export function initForInput(value: string, more?: Partial<RowInputState>): RowInputState {
    const state: RowInputState = {
        type: 'string',
        data: value,
        initialData: value,
        dirty: false,
        error: undefined,
        touched: undefined,
        validate: undefined,
    };
    const rv = more ? { ...state, ...more } : state;
    return rv;
}

export function newAtomForInput(value: string, onChange: OnValueChange<RowInputState>, more?: Partial<RowInputState>): PrimitiveAtom<RowInputState> {
    const state: RowInputState = {
        type: 'string',
        data: value,
        initialData: value,
        dirty: false,
        error: undefined,
        touched: undefined,
        validate: undefined,
    };
    const rv = atomWithCallback(more ? { ...state, ...more } : state, onChange);
    return rv;
}

export function newAtomForCheck(value: boolean, onChange: OnValueChange<RowInputState>): PrimitiveAtom<RowInputState> {
    return newAtomForInput(value ? '1' : '', onChange, { type: 'boolean' });
}

export function validateNonEmpty(value: string) {
    return !!value ? '' : 'Value cannot be empty.';
}

export function validateManifestName(value: string) {
    return !!value ? '' : 'The manifest name cannot be empty.';
}
