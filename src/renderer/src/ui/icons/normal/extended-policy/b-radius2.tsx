import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconExPol11Radius2({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current stroke-none scale-75", className)} fillRule="evenodd" strokeLinejoin="round" viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            {/* <path fill="#b3b3b3" d="M0 0h24v24H0z" /> */}
            <path d="M21.8 4.2c.6 6.3-1.5 13.4-7.3 17.4-1.2.9-2 1.5-3.5 1-7.2-3.2-9.6-12-8.7-18.4 8.6-4 11-3.8 19.5 0M12.2 22c6.5-3.7 9-10.4 8.8-17a26 26 0 0 0-9-3 30 30 0 0 0-8.9 3c-.4 6.3 1.8 14.2 9 17Z" />
            <path d="M19 11c-.1 9.2-13.8 9.2-14 0 .2-9.2 13.9-9.2 14 0M6 11c.2 7.9 12 7.9 12 0S6.3 3 6 11" />
            <path d="M10.3 7.8c.6 0 1.7-.4 1.6.5 1-.9 2.4-.6 3.6-.3l-1.1 1.3c-.3 0-2.5-.5-2.5.8v4.3h-1.6z" />
        </svg>
    );
}
