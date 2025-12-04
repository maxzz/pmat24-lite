import { type HTMLAttributes, type SVGAttributes } from "react"; //match-streamline-ultimate-color--file-copyright-equal.svg
import { classNames } from "@/utils";

export function IconTestTube({ className, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current stroke-none", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            {/* https://heroicons.com/ no-symbol */}
            <path d="M9.3 1.4a.8.8 0 0 0-.8 1.2l.2.2L2 14.4A5.6 5.6 0 0 0 4 22a5.6 5.6 0 0 0 7.7-2l6.7-11.7.2.2a.8.8 0 0 0 .8-1.3l-.9-.5-8.4-4.9zM3.3 15 10 3.5l7.1 4.1-1.5 2.6L13.7 9a.8.8 0 0 0-.7 1.3l1.9 1-1 1.8-3.5-2a.8.8 0 1 0-.8 1.2l3.6 2-1 1.6-1.9-1.2a.8.8 0 0 0-.7 1.3l2 1.2-1.2 2a4 4 0 0 1-5.6 1.4 4 4 0 0 1-1.5-5.6m17.9-3a1.6 1.6 0 0 0-2.4 0l-1 1.2a3 3 0 0 0-.6 1.6c0 1.6 1.3 2.9 2.8 2.9s2.8-1.3 2.8-2.9a3 3 0 0 0-.6-1.6zm-1.3 1h.1l1 1 .3.8q-.1 1.3-1.3 1.3c-1.2 0-1.2-.5-1.2-1.3q0-.2.3-.8z" />
        </svg>
    );
}
