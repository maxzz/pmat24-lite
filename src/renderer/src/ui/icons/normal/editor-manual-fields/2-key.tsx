import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconKey({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-[1.5]", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.81 11.72h2.46m6.08-2.97-.04 6.47m-10.05.08c-1.48 0-2.48-.81-2.46-2.25v-1.68 1.32-1.68c-.02-1.44.78-2.25 2.46-2.25m4.64 6.55c-1.86 0-2.17-.65-2.14-2.09V8.76m4.03 6.5v-1.4c-.02-1.44.31-2.09 1.45-2.09m-11.2 7.45h13.93a2.25 2.25 0 0 0 2.25-2.25V7.05a2.25 2.25 0 0 0-2.25-2.25H5.03a2.25 2.25 0 0 0-2.25 2.25v9.91a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
    );
}
