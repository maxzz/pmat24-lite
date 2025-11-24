import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconColorPickerChrome({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current stroke-none", className)} strokeLinecap="round" viewBox="0 0 20 20" {...rest}>
            {title && <title>{title}</title>}
            <path d="M3 17.08v-3.7l7.13-7.13L9 5.15l1.06-1.07 1.5 1.5 2.3-2.29a.75.75 0 0 1 .55-.23c.21 0 .4.08.55.23l1.81 1.84c.15.15.23.33.23.55 0 .21-.08.4-.23.55L14.5 8.5l1.5 1.52-1.06 1.06-1.13-1.12-7.1 7.12H3Zm1.5-1.5h1.58l6.67-6.66-1.56-1.59L4.5 14v1.58Zm8.83-8.02 1.88-1.9-.8-.8-1.89 1.87.81.83Z" />
        </svg>
    );
}
