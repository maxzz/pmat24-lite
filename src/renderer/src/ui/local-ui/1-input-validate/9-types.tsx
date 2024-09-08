import { PrimitiveAtom } from 'jotai';

export type RowInputStateOptions = {
    initialValidate: boolean;           // Validate value on init and set touched if value is invalid
}

export type RowInputState = {
    type: 'string' | 'number' | 'boolean';
    data: string;
    initialData: string;
    dirty: boolean;                     // True if the value has been changed
    error: string | undefined;
    touched: boolean | undefined;
    validate?: (value: string) => string | undefined;
    options?: RowInputStateOptions;
};

export type RowInputStateAtom = PrimitiveAtom<RowInputState>;
export type RowInputStateAtoms = Record<string, RowInputStateAtom>;
