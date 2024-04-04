import { HTMLAttributes, SVGAttributes } from 'react';

export function SvgSymbolClassicCheck() {
    return (<>
        <symbol id="icon-chkbox" viewBox="0 0 21 21">
            <path d="M5.5 3.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z" />
            <path d="M7.5 10.5l2 2l4-4" />
        </symbol>
    </>);
}

export function SymbolCheckbox({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-chkbox" />
        </svg>
    );
}
