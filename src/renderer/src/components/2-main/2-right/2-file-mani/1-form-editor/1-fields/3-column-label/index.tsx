import { InputHTMLAttributes } from 'react';
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { classNames, turnOffAutoComplete } from '@/utils';

const Column3_LabelClasses = "\
px-2 py-3 h-7 \
\
text-mani-foreground bg-mani-background \
\
border-mani-border-muted border \
\
ring-mani-ring \
focus:ring-1 \
focus:ring-offset-1 \
focus:ring-offset-mani-background \
focus:ring-mani-ring-activated \
\
outline-none \
rounded \
";

type Column3_LabelProps = InputHTMLAttributes<HTMLInputElement> & {
    useItAtom: PrimitiveAtom<boolean>;
    valueAtom: PrimitiveAtom<string>;
};

export function Column3_Label({ useItAtom, valueAtom, className, ...rest }: Column3_LabelProps) {
    const [value, setValue] = useAtom(valueAtom);
    const useIt = useAtomValue(useItAtom);
    return (
        <input
            className={classNames(Column3_LabelClasses, !useIt && "opacity-30 cursor-pointer", className)}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            title={useIt ? "This is a label that appears next to an input field." : undefined}
            {...turnOffAutoComplete}
            {...rest}
        />
    );
}

//TODO: add default text 'Give me a name' or 'No name, give me one';
