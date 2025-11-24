import { type HTMLAttributes, type SVGAttributes } from "react";

export function SvgSymbolFormChange() {
    return (<>
        <symbol id="icon-form-change" viewBox="0 0 24 24">
            <path d="m21.5 10-3 2.8c-.4.5-1.1.5-1.6 0L14 10c-.4-.5.1-1.4.8-1.4H16V7.4c0-1.4-1-2.5-2.4-2.5H10C8.6 5 7.5 6 7.5 7.4c0 .4-.4.7-.8.7H5.6c-.6 0-1.1-.4-1.1-1v-.7c0-2.3 1.9-4.2 4.2-4.2h6.6c2.3 0 4.2 1.9 4.2 4.2v2.2h1.2c.7 0 1.3.9.8 1.4ZM2.5 14l3-2.8c.4-.5 1.1-.5 1.6 0l3 2.8c.4.5-.1 1.4-.8 1.4H8v1.2c0 1.4 1 2.5 2.4 2.5H14c1.3 0 2.4-1.1 2.4-2.5 0-.4.4-.8.8-.8h1.1c.6 0 1.1.5 1.1 1.2v.6c0 2.3-1.9 4.2-4.2 4.2H8.7c-2.3 0-4.2-1.9-4.2-4.2v-2.2H3.3c-.7 0-1.3-.9-.8-1.4Z" />
        </symbol>
    </>);
}

export function SymbolFormChange({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeMiterlimit={10} strokeWidth={1.39} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-form-change" />
        </svg>
    );
}
