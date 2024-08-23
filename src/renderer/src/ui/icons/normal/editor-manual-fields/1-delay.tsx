import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconDelay({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-[1.5]", className)} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            <path d="M12.13 7V5.32m-5.96 7.65H4.5" />
            <path d="M19.77 12.96c0 2.12-.75 3.93-2.23 5.42-1.48 1.48-3.28 2.22-5.42 2.22s-3.93-.74-5.42-2.22c-1.48-1.48-2.22-3.29-2.22-5.42s.74-3.93 2.22-5.42c1.48-1.48 3.29-2.23 5.42-2.23s3.93.75 5.42 2.23a7.37 7.37 0 0 1 2.23 5.42Z" />
            <path d="M6.17 12.96H4.49" />
            <path d="M12.13 7V5.32" />
            <path d="M19.77 12.96h-1.68" />
            <path d="M12.13 20.6v-1.67" />
            <path d="M12.13 8.68v4.28l3.39 3.68" />
            <path d="M6.41 3.66 2.57 7.5" />
            <path d="M21.43 7.24 17.59 3.4" />
        </svg>
    );
}
