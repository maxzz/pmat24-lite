import { type HTMLAttributes, type SVGAttributes } from "react";

export function SvgSymbolClassicCheckEmpty() {
    return (<>
        <symbol id="icon-chkbox-empty" viewBox="0 0 21 21">
            <path d="M5.5 3.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z" />
        </symbol>
    </>);
}

export function SymbolCheckboxEmpty({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-chkbox-empty" />
        </svg>
    );
}
