import React, { InputHTMLAttributes } from 'react';
import { classNames } from '@/utils';
import { PrimitiveAtom, useAtom } from 'jotai';

type RowBooleanProps = InputHTMLAttributes<HTMLInputElement> & {
    useItAtom: PrimitiveAtom<boolean>;
};

export function RowBoolean({ useItAtom, className, ...rest }: RowBooleanProps) {
    const [useIt, setUseIt] = useAtom(useItAtom);

    return (
        <input
            className={classNames("place-self-center size-4 dark-checkbox", className)}
            type="checkbox"
            checked={useIt}
            onChange={() => setUseIt(v => !v)}
            {...rest}
        />
    );
}
