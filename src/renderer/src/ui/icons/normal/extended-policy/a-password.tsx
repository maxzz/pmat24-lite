import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconExPol10Password({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-[.75]", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            {/* <path fill="#b3b3b3" d="M0 0h24v24H0z" /> */}
            <path d="m13.76 16.08-.88-.18c.01-1.11-.8-1.68-1.48-2.28-.37-.13-.64.02-.9.1-2.32.74-5.12-1.46-5.17-4.09a4.27 4.27 0 0 1 6.21-3.84c1.38.66 2.68 2.63 2.21 4.5-.23.9-.05 1.51.65 2.14 1.17 1.05 2.19 2.27 3.37 3.31.89.78 1.02 1.66.78 2.74-1.17.5-2.24-.08-3.34-.33-.29-.22-.1-.61-.33-.89-.22-.23-.6-.04-.85-.28-.21-.22-.08-.55-.28-.9ZM8.52 9.15c.48 0 .92-.42.92-.89a1 1 0 0 0-.97-.96c-.46 0-.96.53-.93 1.01.02.41.53.85.99.85Z" />
        </svg>
    );
}
