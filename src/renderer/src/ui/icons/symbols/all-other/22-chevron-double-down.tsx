import { type HTMLAttributes, type SVGAttributes } from "react";

export function SvgSymbolChevronDoubleDown() {
    return (<>
        <symbol id="icon-chevron-down-2" viewBox="0 0 24 24">
            <path d="M17.157 7.593L11.5 13.25L5.843 7.593l.707-.707l4.95 4.95l4.95-4.95l.707.707zm0 4L11.5 17.25l-5.657-5.657l.707-.707l4.95 4.95l4.95-4.95l.707.707z" />
        </symbol>
    </>);
}

export function SymbolDoubleDown({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-chevron-down-2" />
        </svg>
    );
}
