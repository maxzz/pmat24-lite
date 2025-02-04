import { type ComponentProps } from "react";
import css from "./loader.module.css";
import { classNames } from "@/utils";

export function BarsLoader({ className, ...rest }: ComponentProps<'div'>) {
    return (
        <div className={classNames(css.loader, className)} {...rest} />
    );
}
