import { HTMLAttributes, SVGAttributes } from 'react'; //https://lucide.dev/icons/circle-help
import { classNames } from '@/utils';

export function SvgSymbolQuestion() {
    return (<>
        <symbol id="icon-question" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
        </symbol>
    </>);
}

export function SymbolQuestion({ className, children, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-[1.5]", className)} strokeLinecap="round" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-question" />
        </svg>
    );
}
