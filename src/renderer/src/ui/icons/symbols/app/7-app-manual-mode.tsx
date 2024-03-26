import { HTMLAttributes, SVGAttributes } from 'react';

export function SvgSymbolIconManualMode() {
    return (<>
        {/* one hand */}
        <symbol id="app-manual-mode" viewBox="0 0 24 24">
            <path d="M22.52 12.93c-.45-1.22-2.45-.96-3.97.02-.61.4-1.13.65-2.59.95-.64 0-.78-.68-.66-1.35l1.47-8.19c.42-2.08-2.14-2.84-2.65-.7l-1.27 7.12c-.64 1.78-.88 0-.88 0l-.35-7.67c0-2.78-2.73-2.95-2.73 0l.32 7.01c.14 2.77-.52 1.21-.52.99L7.4 4.87c-.62-2.63-3.07-1.95-2.63.44l1.19 5.56c.2 1.29-.81.68-.99.37L3.8 8.55c-.97-2.05-3.05-1.23-2.38.8l1.95 4.98c.19.54.33 1.09.42 1.66 0 1.4.91 4.26 1.65 5.01a6.87 6.87 0 0 0 9.73 0c1.8-2.02 2.66-2.87 3.37-4.42 0 0 1.82-1.53 4.08-2.81.2-.12-.11-.86-.11-.86Z" />
        </symbol>
    </>);
}

export function SymbolManualMode({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth=".6" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#app-manual-mode" />
        </svg>
    );
}
