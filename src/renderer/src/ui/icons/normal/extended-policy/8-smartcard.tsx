import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

const cls1Classes = "fill-current stroke-none";
const cls2Classes = "fill-none stroke-current [stroke-linejoin:round] [stroke-linecap:round] [stroke-width:0.32px]";

export function IconExPol08Smartcard({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current stroke-none", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            {/* <path fill="#b3b3b3" stroke-width="0" d="M0 0h24v24H0z" /> */}
            <path className={cls2Classes} d="M17.11 8.78H6.81" />
            <path className={cls2Classes} d="M6.73 11.68c.57-.1 1.25.24 1.81-.37-.62-.57-1.24-.26-1.85-.39v2.93c1.11 0 2.19.05 3.26-.02.83-.05.55-.69.48-1.19" />
            <path className={cls2Classes} d="m10.35 11.76-1.13.08c-.23.02-.59-.13-.56.32.1.78 1.22.47 1.8.36v-2.45H6.69c-.09.29-.08.59.03.88" />
            <path className={cls2Classes} d="M8.5 10.39c.45.72 1.18.55 1.85.56" />
            <path className={cls2Classes} d="M5.53 7.17c-.38.06-.41.32-.41.64v8.36c0 .49.2.65.65.65h12.54c.42 0 .57-.15.57-.57V7.73c0-.39-.17-.53-.49-.56H5.53Z" />
        </svg>
    );
}

{/* <svg id="renders" viewBox="0 0 24 24">
    <defs>
        <style>
            .cls-2{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:.32px}
        </style>
    </defs>
</svg>; */}
