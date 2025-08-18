import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

const cls1Classes = "fill-current stroke-none";
const cls4Classes = "fill-none stroke-current [stroke-miterlimit:10] [stroke-linecap:round] stroke-[0.58px]";
const cls5Classes = "fill-none stroke-current [stroke-miterlimit:10] stroke-[0.77px]";

export function IconExPol07Contactless({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current stroke-none", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            {/* <path fill="#b3b3b3" stroke-width="0" d="M0 0h24v24H0z" /> */}
            <path className={cls1Classes} d="M11.99 17.55h-6c-1.29 0-1.81-.5-1.82-1.78-.02-2.51-.02-5.02 0-7.53 0-1.28.53-1.79 1.82-1.79h12.1c1.24 0 1.75.52 1.76 1.74.01 2.54.02 5.08 0 7.62 0 1.24-.5 1.72-1.75 1.73H12Zm.05-1.01c1.91 0 3.81-.02 5.72 0 .75.01 1.11-.22 1.1-1.03-.03-2.35-.03-4.7 0-7.05 0-.76-.34-1-1.04-1H6.2c-.73 0-1.03.31-1.02 1.03.02 2.32.02 4.64 0 6.96-.01.85.37 1.1 1.16 1.09 1.91-.03 3.81 0 5.72 0Z" />
            <path className={cls1Classes} d="M6.94 15.47c-.35-.06-.53-.14-.53-.49 0-.43.36-.51.54-.52 1.01-.04 2.03-.04 3.04 0 .18 0 .51.1.51.46 0 .3-.14.44-.47.5s-2.75.1-3.09.04Z" />
            <rect className={cls5Classes} x="6.57" y="9.22" width="4.02" height="3.17" rx=".74" ry=".74" />
            <path className={cls4Classes} d="M14.57 13.13a1.5 1.5 0 0 0 0-2.2" />
            <path className={cls4Classes} d="M15.2 13.71a2.36 2.36 0 0 0 0-3.36" />
            <path className={cls4Classes} d="M15.83 14.22a3.06 3.06 0 0 0 0-4.44" />
        </svg>
    );
}

{/* <svg id="renders" viewBox="0 0 24 24">
    <defs>
        <style>
            .cls-1{fill:#000;stroke-width:0}.cls-4{fill:none;stroke:#000;stroke-miterlimit:10;stroke-linecap:round;stroke-width:.58px}
        </style>
    </defs>
</svg>; */}
