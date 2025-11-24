import { type HTMLAttributes, type SVGAttributes } from "react";
import { classNames } from "@/utils"; // https://lucide.dev/icons/book-open

export function SvgSymbolCatalog() {
    return (
        <symbol id="app-fcat" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </symbol>
    );
}

export function SymbolCatalog({ className, title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-[1.5]", className)} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#app-fcat" />
        </svg>
    );
}
