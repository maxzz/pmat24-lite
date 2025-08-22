import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconL_ChevronRight({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-2", className)} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}
//lucide-chevron-right
