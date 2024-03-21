import { HTMLAttributes, SVGAttributes } from 'react';

export function SvgSymbolAppWindows() {
    return (<>
        {/* WinXp outlined flag */}
        <symbol id="app-win32" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeLinejoin="bevel"
                d="M9.57 2.44c-1.34.06-2.65.36-3.88.9l-2.07 7.21a8.55 8.55 0 0 1 4.06-.9c1.43.03 2.82.5 3.97 1.35l2.07-7.21a6.74 6.74 0 0 0-4.15-1.35ZM14.8 4.6l-2.07 7.21c1.8 1.17 3.97 2.25 8.03.45l2.07-7.21c-4.24 1.8-6.31.81-8.12-.45h.09Zm-7.67 6.31c-1.34.06-2.65.36-3.88.9l-2.07 7.21c4.24-1.8 6.22-.72 8.03.45l2.07-7.21a6.74 6.74 0 0 0-4.15-1.35Zm5.23 2.07-2.07 7.21c1.8 1.17 3.88 2.16 8.12.36l1.98-7.12c-4.15 1.8-6.22.81-8.03-.45Z"
            />
        </symbol>
    </>);
}

export function SymbolAppWindows({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#app-win32" />
        </svg>
    );
}
