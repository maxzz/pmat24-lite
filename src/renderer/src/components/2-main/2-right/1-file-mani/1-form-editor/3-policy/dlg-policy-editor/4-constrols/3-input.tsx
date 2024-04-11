import { InputHTMLAttributes } from "react";
import { classNames } from '@/utils';

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input className={classNames("p-2 h-9 text-primary-300 bg-primary-700 rounded", className)} {...rest} />
    );
}
