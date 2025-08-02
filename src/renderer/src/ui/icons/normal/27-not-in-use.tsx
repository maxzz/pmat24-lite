import { type HTMLAttributes, type SVGAttributes } from "react"; //match-streamline-ultimate-color--file-copyright-equal.svg
import { classNames } from "@/utils";

export function IconNotInUse({ className, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("stroke-current fill-none", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <g strokeLinecap="round" strokeLinejoin="round">
                <path d="M11.87 14.15.75 7.57 11.87 1 23 7.57z" />
                <path d="m23 7.57-11.13 6.58L.75 7.57v9.1l11.12 6.58L23 16.68z" />
                <path d="m.75 16.68 2.33 1.38m1.8 1.06 7 4.13L23 16.68M.75 13.64l4.24 2.51" />
                <path d="m6.79 17.21 5.08 3L23 13.65M.75 10.61l6.15 3.63" />
                <path d="m8.7 15.3 3.17 1.88L23 10.61M10.6 13.4l1.27.75L23 7.57 11.87 1 .75 7.57l8.05 4.77M.75 23.25 23.25.75" />
            </g>
        </svg>
    );
}

/* 
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <!-- https://icon-sets.iconify.design/?query=hide -> icon-[streamline-cyber-color--layer-hide] --/>
    <g fill="none">
        <path fill="#fff" d="M11.87 14.15.75 7.57 11.87 1 23 7.57z" />
        <path fill="#bbd8ff00" d="m23 7.57-11.13 6.58L.75 7.57v9.1l11.12 6.58L23 16.68z" />
        <path stroke="#092f63" stroke-linecap="round" stroke-linejoin="round" d="m.75 16.68 2.33 1.38m1.8 1.06 7 4.13L23 16.68M.75 13.64l4.24 2.51" />
        <path stroke="#092f63" stroke-linecap="round" stroke-linejoin="round" d="m6.79 17.21 5.08 3L23 13.65M.75 10.61l6.15 3.63" />
        <path stroke="#092f63" stroke-linecap="round" stroke-linejoin="round" d="m8.7 15.3 3.17 1.88L23 10.61M10.6 13.4l1.27.75L23 7.57 11.87 1 .75 7.57l8.05 4.77M.75 23.25 23.25.75" />
    </g>
</svg>;
 */