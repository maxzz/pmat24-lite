import { InputHTMLAttributes } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { classNames, turnOffAutoComplete } from '@/utils';

type Column2_LabelProps =
    & {
        useItAtom: PrimitiveAtom<boolean>;
        valueAtom: PrimitiveAtom<string>;
    }
    & InputHTMLAttributes<HTMLInputElement>;

const Column2_LabelClasses = "\
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

export function Column3_Label({ useItAtom, valueAtom, className, ...rest }: Column2_LabelProps) {
    const [value, setValue] = useAtom(valueAtom);
    const [useIt, setUseIt] = useAtom(useItAtom);
    return (
        <input
            className={classNames(Column2_LabelClasses, !useIt && "opacity-30 cursor-pointer", className)}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            title={useIt ? "The label is shown to the user next to\nthe field for entering a value." : undefined}
            {...turnOffAutoComplete}
            {...rest}
        />
    );
}

//TODO: add default text 'Give me a name' or 'No name, give me one';
