import { InputHTMLAttributes } from 'react';
import { useAtom } from 'jotai';
import { classNames } from '@/utils';
import { RowInputStateAtom } from './9-types';

type OptionCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
    stateAtom: RowInputStateAtom;
};

export function OptionCheckbox({ stateAtom, className, ...rest }: OptionCheckboxProps) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState((v) => ({ ...v, data: (state.data === '1' ? '' : '1')}))
    }

    function onBlur() {
        setState((v) => ({ ...v, touched: true }));
    }

    return (
        <input
            type="checkbox"
            className={classNames("place-self-center size-4 dark-checkbox", className)}
            checked={state.data === '1'}
            value={state.data}
            onChange={onChange}
            onBlur={onBlur}
            {...rest} />
    );
}
