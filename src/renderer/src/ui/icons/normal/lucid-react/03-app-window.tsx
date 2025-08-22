import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconL_AppWindow({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-2", className)} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <path d="M10 4v4" />
            <path d="M2 8h20" />
            <path d="M6 4v4" />
        </svg>
    );
}
//lucide-app-window
