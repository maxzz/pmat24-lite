import { classNames } from '@/utils';
import { HTMLAttributes, SVGAttributes } from 'react';

export function SvgSymbolDot() {
    return (<>
        <symbol id="icon-dot" viewBox="0 0 24 24">
            <path d="M12 16a4 4 0 1 1 0-8a4 4 0 0 1 0 8z" />
        </symbol>
    </>);
}

export function SymbolDot({ className, title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current", className)} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-dot" />
        </svg>
    );
}
