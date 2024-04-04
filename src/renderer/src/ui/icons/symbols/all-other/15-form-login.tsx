import { HTMLAttributes, SVGAttributes } from 'react';

export function SvgSymbolFormLogin() {
    return (<>
        <symbol id="icon-form-login" viewBox="0 0 24 24">
            <path d="m17.93 8.75-4.49 4.49 2.1 2.07a.99.99 0 0 1-.68 1.69s-1.79.2-4.05.2-3.45-.08-3.45-.08a1 1 0 0 1-1.01-.99s-.11-1.96-.11-3.78.11-3.75.11-3.75a.98.98 0 0 1 1.68-.7l2.4 2.37 4.51-4.51a1.03 1.03 0 0 1 1.47 0l1.51 1.51c.41.41.41 1.07 0 1.48Z" />
            <path d="M19.35 21.66s-3.87.18-7.3.18-7.3-.18-7.3-.18a2.25 2.25 0 0 1-2.25-2.25s-.35-2.65-.35-7.41c0-4.4.16-5.64.35-7.41.13-1.24 1.01-2.25 2.25-2.25 0 0 3.9-.18 7.3-.18s7.3.18 7.3.18a2.25 2.25 0 0 1 2.25 2.25s.24 3.69.24 7.41-.24 7.41-.24 7.41a2.25 2.25 0 0 1-2.25 2.25Z" />
        </symbol>
    </>);
}

export function SymbolFormLogin({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeMiterlimit={2} strokeWidth={1.44} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-form-login" />
        </svg>
    );
}
