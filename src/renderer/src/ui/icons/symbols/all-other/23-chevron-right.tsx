import { type HTMLAttributes, type SVGAttributes } from "react";

export function SvgSymbolChevronRight() {
    return (<>
        <symbol id="icon-chevron-right" viewBox="0 0 15 15">
            <path d="M6.16 3.14a.5.5 0 0 1 .7.02l3.76 4c.18.19.18.49 0 .68l-3.75 4a.5.5 0 1 1-.73-.68L9.56 7.5 6.14 3.84a.5.5 0 0 1 .02-.7Z" />
        </symbol>
    </>);
}

export function SymbolChevronRight({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-chevron-right" />
        </svg>
    );
}
