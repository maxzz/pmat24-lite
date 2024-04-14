import { InputHTMLAttributes } from 'react';
import { classNames } from '@/utils';
import { inputRingClasses } from '../../1-fields/6-shared-ui';

const rowInputClasses = "\
px-2 py-1 h-6 \
\
text-mani-foreground bg-mani-background \
\
border-mani-border-muted border \
\
rounded-sm \
outline-none";

export function RowInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input className={classNames(rowInputClasses, inputRingClasses, className)} {...rest} />
    );
}
