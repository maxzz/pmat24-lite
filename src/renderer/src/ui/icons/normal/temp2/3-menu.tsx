import { classNames } from "@/utils";
import { HTMLAttributes } from "react";

export function IconMenu({ className, ...rest }: HTMLAttributes<SVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current", className)} viewBox="0 0 24 24" {...rest}>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z">
            </path>
        </svg>
    );
}
