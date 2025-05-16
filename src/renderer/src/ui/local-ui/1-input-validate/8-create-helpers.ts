import { type PrimitiveAtom } from "jotai";
import { type OnValueChange, atomWithCallback } from "@/utils";
import { type RowInputState } from "./9-types";

export type OnChangeValueWithUpdateName<T = any> = (updateName: string) => OnValueChange<T>; //TODO: it should be string, but it's any for now, due to some options are boolean

export function initStateForInput(value: string, more?: Partial<RowInputState>): RowInputState {
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

export function dataForStateAtom(value: string | number, more?: Partial<RowInputState>): RowInputState {
    value = value.toString();

    const { options, ...rest } = more || {};

    if (options?.initialValidate) {
        const error = rest.validate?.(value);
        if (error) {
            rest.error = error;
            rest.touched = true;
        }
    }

    const state: RowInputState = {
        type: 'string',
        data: value,
        initialData: value,
        dirty: false,
        error: undefined,
        touched: undefined,
        validate: undefined,
    };

    const initialData = more ? { ...state, ...rest } : state;

    return initialData;
}

export function resetRowInputState(state: RowInputState, value: string): RowInputState {
    const rv = {
        ...state,
        data: value,
        dirty: false,
        error: undefined,
        touched: undefined,
    };
    return rv;
}

export function createAtomForInput(value: string | number, onChange: OnValueChange<RowInputState>, more?: Partial<RowInputState>): PrimitiveAtom<RowInputState> {
    const initialData = dataForStateAtom(value, more);
    const rv = atomWithCallback(initialData, onChange);
    return rv;
}

export function createAtomForCheck(value: boolean, onChange: OnValueChange<RowInputState>): PrimitiveAtom<RowInputState> {
    return createAtomForInput(value ? '1' : '', onChange, { type: 'boolean' });
}
