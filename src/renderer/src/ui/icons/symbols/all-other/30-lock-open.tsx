import { HTMLAttributes, SVGAttributes } from "react"; //https://heroicons.com lock
import { classNames } from "@/utils";

export function SvgSymbolLockOpen() {
    return (<>
        <symbol id="icon-lock-open" viewBox="0 0 24 24">
            <path d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </symbol>
    </>);
}

export function SymbolLockOpen({ className, children, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-[1.5]", className)} strokeLinecap="round" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-lock-open" />
        </svg>
    );
}
