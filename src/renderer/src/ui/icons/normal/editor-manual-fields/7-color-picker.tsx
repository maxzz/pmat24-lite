import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconColorPicker({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current", className)} strokeLinecap="square" strokeLinejoin="round" viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path d="M13.74 6.31 2.33 17.72l-.01 4.07 4.06-.01L17.8 10.37" />
            <path d="m11.29 3.74 9.01 9.01" />
            <path d="m18.7 2.3 2.89 2.9-4.43 4.43-2.9-2.9z" />
        </svg>
    );
}
