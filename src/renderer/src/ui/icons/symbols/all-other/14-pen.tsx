import { HTMLAttributes, SVGAttributes } from 'react';

export function SvgSymbolPen() {
    return (<>
        <symbol id="icon-pen" viewBox="0 0 24 24">
            <path d="M1.48 20.12 6.37 8.39l7.65-2.91 5.01 3.21-.64 8.27-14.65 5.53c-.21.08-.38-.19-.21-.34l7.4-6.6s.23-.28.57-.39c.65-.21 1.7-.17 2.42-1.18 1.37-1.91-1.11-4.28-3.09-3.1-1.04.62-1.12 2.04-1.24 2.89-.05.39-.32.66-.32.66L1.85 20.4c-.19.16-.47-.05-.37-.28Z" />
            <path d="m15.79 3.77 1.77-2.22c.06-.07.15-.08.23-.03l4.68 3.16c.08.06.1.17.04.25L20.64 7.2a.17.17 0 0 1-.23.03L15.8 3.92s-.05-.08 0-.14Z" />
        </symbol>
    </>);
}

export function SymbolPen({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-pen" />
        </svg>
    );
}
