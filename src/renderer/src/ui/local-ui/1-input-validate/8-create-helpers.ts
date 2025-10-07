import { type OnValueChange, atomWithCallback } from "@/utils";
import { type RowInputState, type RowInputStateAtom } from "./9-types";

export type OnChangeValueWithUpdateName<T = any> = (updateName: string) => OnValueChange<T>; //TODO: it should be string, but it's any for now, due to some options are boolean

// Init state

export function initRowInputState(value: string, more?: Partial<RowInputState>): RowInputState {
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

// Create atoms

export function createAtomForInput(value: string | number, onChange: OnValueChange<RowInputState>, more?: Partial<RowInputState>): RowInputStateAtom {
    const initialData = createDataForStateAtom(value, more);
    const rv = atomWithCallback(initialData, onChange);
    return rv;
}

export function createAtomForCheck(value: boolean, onChange: OnValueChange<RowInputState>): RowInputStateAtom {
    return createAtomForInput(value ? '1' : '', onChange, { type: 'boolean' });
}

export function createDataForStateAtom(value: string | number, more?: Partial<RowInputState>): RowInputState {
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

// Reset state

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

// Set atom

export function setRowInputStateAtomValue({ stateAtom, value, error, getset: { get, set } }: { stateAtom: RowInputStateAtom; value: RowInputState['data']; error?: string; getset: GetSet; }) {
    const state = get(stateAtom);
    const newState: RowInputState = {
        ...state,
        data: value,
        error: error !== undefined ? error : state.validate?.(value), // set error if it was checked from outside otherwise use the one from validation
        dirty: state.initialData !== value,
    };
    set(stateAtom, newState);
}
