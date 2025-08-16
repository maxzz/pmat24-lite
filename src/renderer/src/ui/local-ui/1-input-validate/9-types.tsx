import { type ReactNode, type InputHTMLAttributes } from "react";
import { type PrimitiveAtom } from "jotai";

export type RowInputStateOptions = {
    initialValidate: boolean;               // Validate value on init and set touched if value is invalid
};

export type RowInputState = {
    type: "string" | "textarea" | "number" | "boolean";
    data: string;
    initialData: string;
    dirty: boolean;                         // True if the value has been changed
    error: string | undefined;
    touched: boolean | undefined;
    validate?: (value: string) => string | undefined;
    options?: RowInputStateOptions;         // options exist only during initialization

    //nameOfChange: string;                 //TODO: This may simplify the onChange function. see "src/store/2-file-mani-atoms/4-options/0-conv/2-create-atoms.tsx"
    //uuid: number;                         //TODO: This may simplify validation
};

export type OptionInputProps =
    & Pick<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, "onFocus" | "onBlur" | "readOnly" | "disabled" | "onClick"> // & Omit<InputHTMLAttributes<HTMLInputElement>, "value">
    & {
        className?: string;
    }
    & {
        stateAtom: RowInputStateAtom;
        onValueStateChange?: OnValueStateChange;
    };

export type OptionInputWTypeProps =
    & OptionInputProps
    & {
        asCheckbox?: boolean;
        asTextarea?: boolean;
        containerClasses?: string;
        labelClasses?: string;
        twoRows?: boolean;                  // if true, then label and input will be in two rows otherwise in one row for label anf input (i.e. two columns)
    };

export type RowInputStateAtom = PrimitiveAtom<RowInputState>;
export type RowInputStateAtoms = Record<string, RowInputStateAtom>;

export type OnValueStateChange = () => void; // value and value vilidation information
