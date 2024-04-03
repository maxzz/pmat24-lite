import { InputHTMLAttributes } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { classNames } from '@/utils';

type Column2_LabelProps =
    & {
        useItAtom: PrimitiveAtom<boolean>;
        valueAtom: PrimitiveAtom<string>;
    }
    & InputHTMLAttributes<HTMLInputElement>;

const Column2_LabelClasses = "\
px-2 py-3 h-8 \
\
bg-primary-700 text-primary-200 \
\
ring-primary-600 \
focus:ring-offset-primary-800 \
focus:ring-primary-400 \
focus:ring-1 \
focus:ring-offset-1 \
outline-none \
rounded \
";

export function Column2_Label({ useItAtom, valueAtom, className, ...rest }: Column2_LabelProps) {
    const [value, setValue] = useAtom(valueAtom);
    const [useIt, setUseIt] = useAtom(useItAtom);
    return (
        <input
            className={classNames(Column2_LabelClasses, !useIt && "opacity-30 cursor-pointer", className)}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            title={useIt ? "The label is shown to the user next to\nthe field for entering a value." : undefined}
            autoComplete="off" list="autocompleteOff" spellCheck={false}
            {...rest}
        />
    );
}

//TODO: add default text 'Give me a name' or 'No name, give me one';
