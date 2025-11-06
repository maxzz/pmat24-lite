import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconRadix_DragHandleDots1({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current", className)} viewBox="0 0 15 15" {...rest}>
            {title && <title>{title}</title>}
            <circle cx="4.5" cy="2.5" r=".6" />
            <circle cx="4.5" cy="4.5" r=".6" />
            <circle cx="4.5" cy="6.499" r=".6" />
            <circle cx="4.5" cy="8.499" r=".6" />
            <circle cx="4.5" cy="10.498" r=".6" />
            <circle cx="4.5" cy="12.498" r=".6" />
            <circle cx="6.5" cy="2.5" r=".6" />
            <circle cx="6.5" cy="4.5" r=".6" />
            <circle cx="6.5" cy="6.499" r=".6" />
            <circle cx="6.5" cy="8.499" r=".6" />
            <circle cx="6.5" cy="10.498" r=".6" />
            <circle cx="6.5" cy="12.498" r=".6" />
            <circle cx="8.499" cy="2.5" r=".6" />
            <circle cx="8.499" cy="4.5" r=".6" />
            <circle cx="8.499" cy="6.499" r=".6" />
            <circle cx="8.499" cy="8.499" r=".6" />
            <circle cx="8.499" cy="10.498" r=".6" />
            <circle cx="8.499" cy="12.498" r=".6" />
            <circle cx="10.499" cy="2.5" r=".6" />
            <circle cx="10.499" cy="4.5" r=".6" />
            <circle cx="10.499" cy="6.499" r=".6" />
            <circle cx="10.499" cy="8.499" r=".6" />
            <circle cx="10.499" cy="10.498" r=".6" />
            <circle cx="10.499" cy="12.498" r=".6" />
        </svg>
    );
}
