import { HTMLAttributes, SVGAttributes } from 'react';

export function SvgSymbolChevronUp() {
    return (<>
        <symbol id="icon-chevron-up" viewBox="0 0 24 24">
            <path d="M5.843 15.407L11.5 9.75l5.657 5.657l-.707.707l-4.95-4.95l-4.95 4.95l-.707-.707z" />
        </symbol>
    </>);
}

export function SymbolChevronUp({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-chevron-up" />
        </svg>
    );
}
