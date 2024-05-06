import { InputHTMLAttributes } from 'react';
import { RowInputStateAtom } from './9-types';
import { RowLabel } from './2-row-label';
import { InputBody } from './4-row-body-w-tooltip';

type RowInputWAtomProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    stateAtom: RowInputStateAtom;
};

export function RowInputGuard({ label, ...rest }: RowInputWAtomProps) {
    return (
        <RowLabel label={label}>
            <InputBody {...rest} />
        </RowLabel>
    );
}
