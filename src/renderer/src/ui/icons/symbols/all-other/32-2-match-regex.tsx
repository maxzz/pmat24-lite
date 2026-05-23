import { type HTMLAttributes, type SVGAttributes } from "react"; //https://icon-sets.iconify.design/?query=regex bi:regex
import { classNames } from "@/utils";

export function SvgSymbolMatchRegex() {
    return (<>
        <symbol id="icon-match-regex" viewBox="0 0 24 24">
            {/* className="[fill-rule:evenodd]" */}
            <path d="M 5.194 5.202 a 9.625 9.625 0 0 0 0 13.612 a 0.687 0.687 0 0 1 -0.972 0.972 a 11 11 0 0 1 0 -15.556 a 0.687 0.687 0 1 1 0.972 0.972 m 13.612 -0.972 a 0.687 0.687 0 0 1 0.972 0 a 11 11 0 0 1 0 15.556 a 0.687 0.687 0 0 1 -0.972 -0.972 a 9.625 9.625 0 0 0 0 -13.612 a 0.687 0.687 0 0 1 0 -0.972 M 9.25 16.133 a 1.375 1.375 0 1 1 -2.75 0 a 1.375 1.375 0 0 1 2.75 0 m 6.875 -8.937 a 0.687 0.687 0 0 0 -1.375 0 v 2.911 L 12.353 8.667 a 0.687 0.687 0 0 0 -0.707 1.18 L 14.101 11.321 L 11.647 12.794 a 0.687 0.687 0 1 0 0.707 1.18 L 14.75 12.535 V 15.446 a 0.687 0.687 0 1 0 1.375 0 V 12.535 l 2.397 1.438 a 0.687 0.687 0 0 0 0.707 -1.18 L 16.774 11.321 l 2.454 -1.473 a 0.687 0.687 0 1 0 -0.707 -1.18 L 16.125 10.107 z" />
        </symbol>
    </>);
}

export function SymbolMatchRegex({ className, children, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current stroke-none", className)} strokeLinecap="round" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-match-regex" />
        </svg>
    );
}
