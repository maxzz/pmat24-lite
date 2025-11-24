import { type HTMLAttributes, type SVGAttributes } from "react";
import { classNames } from "@/utils";

export function SvgSymbolAppWebChrome() { // https://lucide.dev/icons/chrome
    return (
        <symbol id="app-web-chrome" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <path d="M21.17 8H12" />
            <path d="M3.95 6.06 8.54 14" />
            <path d="M10.88 21.94 15.46 14" />
        </symbol>
    );
}

export function SymbolAppWebChrome({ className, title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current", className)} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#app-web-chrome" />
        </svg>
    );
}
