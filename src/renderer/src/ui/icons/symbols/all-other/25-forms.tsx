import { HTMLAttributes, SVGAttributes } from 'react'; // https://lucide.dev/icons/square-gantt-chart
import { classNames } from '@/utils';

export function SvgSymbolForms() {
    return (<>
        <symbol id="icon-forms" viewBox="0 0 24 24">
            <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 8h7" />
            <path d="M8 12h6" />
            <path d="M11 16h5" />
        </symbol>
    </>);
}

export function SymbolForms({ className, children, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-[1.5]", className)} strokeLinecap="round" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-forms" />
        </svg>
    );

}
