import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import css from "./1-wait.module.css";

export function Spinner({ className, blockClasses, ...rest }: { blockClasses: string; } & ComponentPropsWithoutRef<'div'>) {
    return (
        <div className={classNames("relative", className)} {...rest}>
            {Array.from({ length: 12 }).map(
                (_, i) => (
                    <div className={classNames(css["spinner-blade"], blockClasses)} key={i} />
                ))
            }
        </div>
    );
}
