import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

const cls1Classes = "fill-current stroke-none";
const cls3Classes = "fill-none stroke-current [stroke-linecap:round] [stroke-miterlimit:10] stroke-[0.75px]";

export function IconExPol04Proxy({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current stroke-none", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}

            {/* <path fill="#b3b3b3" stroke-width="0" d="M0 0h24v24H0z" /> */}
            <path className={cls3Classes} d="M19.24 3.8s1.18.4 1.92 1.33.8 1.61.8 1.61" />
            <path className={cls3Classes} d="M19.03 5.08s.81.23 1.3.84.5 1.08.5 1.08" />
            <path className={cls3Classes} d="M18.8 6.27s.43.1.68.41.24.56.24.56" />
            <path className={cls1Classes} d="M12.04 17H6.28c-1.11 0-1.32-.21-1.32-1.31V8.46c0-1.02.38-1.44 1.4-1.45 3.81-.02 7.62-.02 11.43 0 .85 0 1.25.41 1.26 1.27.02 2.61.01 5.21 0 7.82 0 .75-.16.89-.95.9-2.02.02-4.04 0-6.06 0Zm.15-4.91H6.63c-.31 0-.49.16-.49.48v2.93c0 .31.17.48.49.49l.78.01h9.96c.49.03.72-.17.7-.68-.02-.78 0-1.56 0-2.34-.01-.86-.03-.88-.88-.88h-4.98Zm-.11-3.91H6.89c-.69 0-.78.12-.77.8 0 .65.07.73.84.73h10.57c.37 0 .5-.21.52-.56.06-.83-.05-.98-.89-.98h-5.09Z" />
            <path className={cls1Classes} d="M14.64 14.83c-.58 0-1.16.02-1.74-.01-.16 0-.3-.18-.45-.27.13-.16.24-.39.41-.45.23-.08.51-.05.77-.05h2.52c.33 0 .73.05.68.49-.04.39-.45.29-.72.29h-1.45Z" />
        </svg>
    );
}
{/* <svg id="renders" viewBox="0 0 24 24">
    <defs>
        <style>
            .cls-1{fill:#000;stroke-width:0}.cls-3{fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:.75px}
        </style>
    </defs>
</svg>; */}