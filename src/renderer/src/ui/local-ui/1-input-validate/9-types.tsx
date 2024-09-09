import { PrimitiveAtom } from 'jotai';

export type RowInputStateOptions = {
    initialValidate: boolean;               // Validate value on init and set touched if value is invalid
}

export type RowInputState = {
    type: 'string' | 'number' | 'boolean';
    data: string;
    initialData: string;
    dirty: boolean;                         // True if the value has been changed
    error: string | undefined;
    touched: boolean | undefined;
    validate?: (value: string) => string | undefined;
    options?: RowInputStateOptions;         // options exist only during initialization

    //nameOfChange: string;                 //TODO: This may simplify the onChange function. see 'src/store/atoms/3-file-mani-atoms/4-options/0-conv/2-create-atoms.tsx'
    //uuid: number;                         //TODO: This may simplify validation
};

export type RowInputStateAtom = PrimitiveAtom<RowInputState>;
export type RowInputStateAtoms = Record<string, RowInputStateAtom>;
