import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconRadix_DotFilled({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current", className)} viewBox="0 0 15 15" {...rest}>
            {title && <title>{title}</title>}
            <path d="M7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125Z" />
        </svg>
    );
}
