import { classNames } from "@/utils";
import { HTMLAttributes } from "react";

export function IconFile({ className, ...rest }: HTMLAttributes<SVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current", className)} viewBox="0 0 21 21" {...rest}>
            <g fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16.5 15.5v-7l-5-5h-5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zm-10-5h5m-5 2h7m-7 2h3" />
                <path d="M11.5 3.5v3a2 2 0 0 0 2 2h3" />
            </g>
        </svg>
    );
}
