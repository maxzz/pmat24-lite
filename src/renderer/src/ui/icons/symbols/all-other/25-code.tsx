import { HTMLAttributes, SVGAttributes } from 'react'; // https://www.radix-ui.com/icons
import { classNames } from '@/utils';

export function SvgSymbolCode() {
    return (<>
        <symbol id="icon-code" viewBox="0 0 15 15">
            <path d="M9.96 2.69a.5.5 0 1 0-.92-.38l-4 10a.5.5 0 1 0 .92.38l4-10Zm-6.1 2.46c.19.2.19.5 0 .7L2.2 7.5l1.64 1.65a.5.5 0 1 1-.7.7l-2-2a.5.5 0 0 1 0-.7l2-2c.2-.2.5-.2.7 0Zm7.29 0c.2-.2.5-.2.7 0l2 2c.2.2.2.5 0 .7l-2 2a.5.5 0 0 1-.7-.7l1.64-1.65-1.64-1.65a.5.5 0 0 1 0-.7Z" />
        </symbol>
    </>);
}

export function SymbolCode({ className, children, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current stroke-none", className)} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-code" />
        </svg>
    );

}