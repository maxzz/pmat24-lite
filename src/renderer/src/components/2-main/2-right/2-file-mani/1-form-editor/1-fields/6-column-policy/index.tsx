import { InputHTMLAttributes } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { classNames, turnOffAutoComplete } from '@/utils';

const Column6_PolicyClasses = "\
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

type Column6_LabelProps = InputHTMLAttributes<HTMLInputElement> & {
    useItAtom: PrimitiveAtom<boolean>;
    valueAtom: PrimitiveAtom<string>;
};

export function Column6_Policy({ useItAtom, valueAtom, className, ...rest }: Column6_LabelProps) {
    const [value, setValue] = useAtom(valueAtom);
    const [useIt, setUseIt] = useAtom(useItAtom);
    return (
        <input
            className={classNames(Column6_PolicyClasses, !useIt && "opacity-30 cursor-pointer", className)}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            title={useIt ? "This is the label that appears next to the value entry field." : undefined}
            {...turnOffAutoComplete}
            {...rest}
        />
    );
}

//TODO: add default text 'Give me a name' or 'No name, give me one';
