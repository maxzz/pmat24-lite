import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconChevronRight({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current", className)} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
    );
}
