import { classNames } from '@/utils';
import { HTMLAttributes, SVGAttributes } from 'react';

export function SvgSymbolInfo() {
    return (<>
        <symbol id="icon-info" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </symbol>
    </>);
}

export function SymbolInfo({ className, children, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-[1.5]", className)} stroke-linecap="round" stroke-linejoin="round" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-info" />
        </svg>
    );
}
