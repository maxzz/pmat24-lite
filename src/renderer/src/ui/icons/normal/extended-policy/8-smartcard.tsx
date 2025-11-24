import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";

const cls1Classes = "fill-current stroke-none";
const cls2Classes = "fill-none stroke-current [stroke-linejoin:round] [stroke-linecap:round] stroke-[0.35px]";
const cls5Classes = "fill-none stroke-current [stroke-linejoin:round] [stroke-linecap:round] stroke-[0.4]";
const cls6Classes = "fill-none stroke-current [stroke-linejoin:round] [stroke-linecap:round] stroke-[0.75]";

export function IconExPol08Smartcard({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current stroke-none", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            {/* <path fill="#b3b3b3" stroke-width="0" d="M0 0h24v24H0z" /> */}
            <path className={cls6Classes} d="M17 9.07H6.71" />
            <path className={cls2Classes} d="M6.59 11.5h1.15s.55.06.55.54-.54.46-.54.46H6.59" />
            <path className={cls5Classes} d="M6.59 14.62h3.76v-4.14H6.59v4.14Z" />
            <path className={cls2Classes} d="M10.34 12.63c-1.06-.01-1.71.04-1.71.46s1.25.46 1.71.46" />
            <path className={cls2Classes} d="M8.4 10.48c0 .99 1.32.88 1.95.88" />
            <path className="stroke-none" d="M11.99 17.55h-6c-1.29 0-1.81-.5-1.82-1.78-.02-2.51-.02-5.02 0-7.53 0-1.28.53-1.79 1.82-1.79h12.1c1.24 0 1.75.52 1.76 1.74.01 2.54.02 5.08 0 7.62 0 1.24-.5 1.72-1.75 1.73H12Zm.05-1.01c1.91 0 3.81-.02 5.72 0 .75.01 1.11-.22 1.1-1.03-.03-2.35-.03-4.7 0-7.05 0-.76-.34-1-1.04-1H6.2c-.73 0-1.03.31-1.02 1.03.02 2.32.02 4.64 0 6.96-.01.85.37 1.1 1.16 1.09 1.91-.03 3.81 0 5.72 0Z" />
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
