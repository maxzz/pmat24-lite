import { PrimitiveAtom } from 'jotai';


export type RowInputState = {
    data: string;
    dirty: boolean;
    error: string | undefined;
    touched: boolean | undefined;
    validate?: (value: string) => string | undefined;
};

export type RowInputStateAtom = PrimitiveAtom<RowInputState>;
