import { type HTMLAttributes, type SVGAttributes } from "react";
import { classNames } from "@/utils";

export function SvgSymbolOpenLinkRun() {
    return (<>
        <symbol id="icon-open-link-run" viewBox="0 0 24 24">
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M12 4a1 1 0 1 0 2 0 1 1 0 1 0-2 0M4 17l5 1 .8-1.5M15 21v-4l-4-3 1-6" />
            <path d="M7 12V9l5-1 3 3 3 1" />
        </symbol>
    </>);
}

export function SymbolOpenLinkRun({ className, title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-[1.5]", className)} strokeLinecap="round" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-open-link-run" />
        </svg>
    );
}
