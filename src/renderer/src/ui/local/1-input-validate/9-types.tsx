import { PrimitiveAtom } from 'jotai';

export type RowInputState = {
    type: 'string' | 'number' | 'boolean';
    data: string;
    initialData: string;
    dirty: boolean;                 // if the value has been changed
    error: string | undefined;
    touched: boolean | undefined;
    validate?: (value: string) => string | undefined;
};

export type RowInputStateAtom = PrimitiveAtom<RowInputState>;
