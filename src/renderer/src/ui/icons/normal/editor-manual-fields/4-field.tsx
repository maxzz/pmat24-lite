import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconField({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-[1.5]", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm1 2.5h1.5m1.5 0H6.5m0 0v7m0 0H5m1.5 0H8" />
        </svg>
    );
}
