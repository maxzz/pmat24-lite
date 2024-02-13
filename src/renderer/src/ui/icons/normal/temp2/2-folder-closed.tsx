import { classNames } from "@/utils";
import { HTMLAttributes } from "react";

export function IconFolderClosed({ className, ...rest }: HTMLAttributes<SVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current", className)} viewBox="0 0 21 21" {...rest}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 5.5v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-1.85-2H10.5l-2-2h-4a1 1 0 0 0-1 1zm0 1h7" />
        </svg>
    );
}
