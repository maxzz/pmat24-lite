import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function Radio({ children, name, checked, onChange, className, ...rest }: { name: string; checked: boolean; } & HTMLAttributes<HTMLElement>) {
    return (
        <label className={classNames("w-max inline-flex items-center gap-x-1.5 select-none cursor-pointer", className)} {...rest}>
            <input className="size-3 dark-radio" name={name} checked={checked} onChange={onChange} type="radio" />
            {children}
        </label>
    );
}
