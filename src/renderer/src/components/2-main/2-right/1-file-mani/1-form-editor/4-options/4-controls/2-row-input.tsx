import { InputHTMLAttributes } from 'react';
import { classNames } from '@/utils';

const rowInputClasses = "\
px-2 py-1 h-6 \
\
text-primary-300 bg-primary-800 \
\
ring-primary-600 \
\
focus:ring-1 \
focus:ring-offset-1 \
focus:ring-offset-primary-800 \
focus:ring-primary-500 \
\
rounded-sm \
outline-none \
";

export function RowInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input className={classNames(rowInputClasses, className)} {...rest} />
    );
}
