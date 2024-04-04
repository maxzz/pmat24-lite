import { HTMLAttributes, SVGAttributes } from 'react';

export function SvgSymbolChevronDown() {
    return (<>
        <symbol id="icon-chevron-down" viewBox="0 0 24 24">
            <path d="M5.843 9.593L11.5 15.25l5.657-5.657l-.707-.707l-4.95 4.95l-4.95-4.95l-.707.707z" />
        </symbol>
    </>);
}

export function SymbolChevronDown({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-chevron-down" />
        </svg>
    );
}
