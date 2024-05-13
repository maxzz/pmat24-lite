import { HTMLAttributes, SVGAttributes } from 'react'; // https://lucide.dev/icons/ellipsis
import { classNames } from '@/utils';

export function SvgSymbolEllipsis() {
    return (<>
        <symbol id="icon-ellipsis" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
        </symbol>
    </>);
}

export function SymbolEllipsis({ className, children, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-[1.5]", className)} strokeLinecap="round" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-ellipsis" />
        </svg>
    );

}
