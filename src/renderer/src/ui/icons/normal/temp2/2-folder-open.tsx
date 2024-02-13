import { classNames } from "@/utils";
import { HTMLAttributes } from "react";

export function IconFolderOpen({ className, ...rest }: HTMLAttributes<SVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current", className)} viewBox="0 0 21 21" {...rest}>
            <g strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 8.5a2 2 0 0 0-2-2h-5l-2-2h-4a1 1 0 0 0-1 1v3" />
                <path d="M2.81 9.74 4.12 15a2 2 0 0 0 1.94 1.51h8.88A2 2 0 0 0 16.88 15l1.31-5.25a1 1 0 0 0-.97-1.24H3.78a1 1 0 0 0-.97 1.24z" />
            </g>
        </svg>
    );
}
