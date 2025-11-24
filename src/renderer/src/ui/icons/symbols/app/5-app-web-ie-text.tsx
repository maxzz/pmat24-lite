import { type HTMLAttributes, type SVGAttributes } from "react";
import { classNames } from "@/utils";

export function SvgSymbolAppWebIeText() { // ie text
    return (
        <symbol id="app-web-ie-text" viewBox="0 0 24 24">
            <path d="M2.38 17.52h2.79V6.48H2.38V4.95h8.3v1.53H7.77v11.05h2.91v1.53h-8.3v-1.53Z" />
            <path d="M12.68 4.95h8.82v1.53h-6.22v4.4h5.36v1.53h-5.36v5.12h6.35v1.53h-8.95V4.95Z" />
        </symbol>
    );
}

export function SymbolAppWebIeText({ className, title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-[.8]", className)} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#app-web-ie-text" />
        </svg>
    );
}
