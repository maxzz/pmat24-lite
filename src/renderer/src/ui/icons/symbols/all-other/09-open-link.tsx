import { type HTMLAttributes, type SVGAttributes } from "react";

export function SvgSymbolOpenLink() {
    return (<>
        <symbol id="icon-open-link" viewBox="0 0 24 24">
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </symbol>
    </>);
}

export function SymbolOpenLink({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-open-link" />
        </svg>
    );
}
