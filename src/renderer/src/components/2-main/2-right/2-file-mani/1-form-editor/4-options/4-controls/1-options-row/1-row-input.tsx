import { InputHTMLAttributes } from 'react';
import { RowInputStateAtom } from './9-types';
import { InputLabel } from './3-input-label';
import { InputBody } from './5-input-body';

type RowInputWAtomProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    stateAtom: RowInputStateAtom;
};

export function RowInputGuard({ label, ...rest }: RowInputWAtomProps) {
    return (
        <InputLabel label={label}>
            <InputBody {...rest} />
        </InputLabel>
    );
}
