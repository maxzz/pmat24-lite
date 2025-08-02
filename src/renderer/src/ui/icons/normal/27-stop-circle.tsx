import { type HTMLAttributes, type SVGAttributes } from "react"; //match-streamline-ultimate-color--file-copyright-equal.svg
import { classNames } from "@/utils";

export function IconStopCircle({ className, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("stroke-[1.5] stroke-red-500 fill-none", className)} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            {/* https://heroicons.com/ no-symbol */}
            <path d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
    );
}
