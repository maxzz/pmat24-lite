import { InputHTMLAttributes } from 'react';
import { useAtom } from 'jotai';
import { classNames } from '@/utils';
import { inputRingClasses } from '@/ui';
import { RowInputStateAtom } from './9-types';

const rowInputClasses = "\
px-2 py-1 h-6 w-full \
\
text-mani-foreground bg-mani-background \
\
border-mani-border-muted border \
\
rounded-sm \
outline-none";

export function RawInput({ stateAtom, className, ...rest }: InputHTMLAttributes<HTMLInputElement> & { stateAtom: RowInputStateAtom; }) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState((v) => ({ ...v, data: e.target.value }));
        setState((v) => ({ ...v, error: state.validate?.(e.target.value) }));
    }

    function onBlur() {
        setState((v) => ({ ...v, touched: true }));
        setState((v) => ({ ...v, error: state.validate?.(state.data) }));
    }

    return (
        <input
            className={classNames(rowInputClasses, inputRingClasses /*, vakue.error && "ring-1 ring-red-500/70"*/, className)}
            value={state.data}
            onChange={onChange}
            onBlur={onBlur}
            {...rest} />
    );
}
