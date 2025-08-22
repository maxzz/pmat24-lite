import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconL_Layout({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-2", className)} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M3 9h18" />
            <path d="M9 21V9" />
        </svg>
    );
}
//lucide-panels-top-left
