import { PrimitiveAtom } from "jotai";
import { OnValueChange, atomWithCallback } from "@/util-hooks";
import { RowInputState } from "./9-types";

export type OnChangeValueWithUpdateName = (updateName: string) => OnValueChange<any>; //TODO: it should be string, but it's any for now, due to some options are boolean

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

export function newAtomForInput(value: string | number, onChange: OnValueChange<RowInputState>, more?: Partial<RowInputState>): PrimitiveAtom<RowInputState> {
    value = value.toString();
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
