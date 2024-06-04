import { HTMLAttributes } from "react";
import { classNames } from '@/utils';

export function Check({ children, checked, onChange, className, ...rest }: { checked: boolean; } & HTMLAttributes<HTMLElement>) {
    return (
        <label className={classNames("w-max inline-flex items-center gap-x-2 select-none cursor-pointer", className)} {...rest}>
            <input className="place-self-center size-4 dark-checkbox" checked={checked} onChange={onChange} type="checkbox" />
            {children}
        </label>
    );
}
