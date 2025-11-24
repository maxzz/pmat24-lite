import { classNames } from "@/utils";
import { type HTMLAttributes, type SVGAttributes } from "react";

export function IconSearch({ className, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39zM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7z" />
        </svg>
    );
}
