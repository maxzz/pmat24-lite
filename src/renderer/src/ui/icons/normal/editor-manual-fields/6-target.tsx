import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconTarget2({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current", className)} strokeLinecap="round" viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <circle cx="12" cy="12" r="8.04" />
            <circle cx="12" cy="12" r="4.99" />
            <path d="M12 1.5v8.13" />
            <path d="M22.5 12h-8.13" />
            <path d="M12 22.5v-8.13" />
            <path d="M1.5 12h8.13" />
        </svg>
    );
}
