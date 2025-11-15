import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconExPol11Radius({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-[.75] scale-75", className)} fillRule="evenodd" strokeLinejoin="round" viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            {/* <path fill="#b3b3b3" d="M0 0h24v24H0z" /> */}
            <path style={{opacity:0.3}} d="M5.42 12c0-4.78 3.03-8.86 7.28-10.41h-.05a14 14 0 0 0-1.71.03q-.53.06-1.04.16a10 10 0 0 0-3.73 1.57q-1.04.7-1.89 1.64-.33.37-.64.77a10.4 10.4 0 0 0-1.73 8.86 10.5 10.5 0 0 0 4.27 6.05q.33.22.67.42c1.52.87 3.28 1.37 5.16 1.37q.33 0 .65-.02h.04a11.1 11.1 0 0 1-7.28-10.41Z" />
            <path d="M22.42 12c0-2.81-1.11-5.36-2.92-7.23L14 10.74a2.37 2.37 0 1 1-3.74-.35 2.4 2.4 0 0 1 2.8-.52l5.51-5.97a10.4 10.4 0 0 0-5.87-2.31h-.06a14 14 0 0 0-1.71.03 11 11 0 0 0-2.99.77 10.4 10.4 0 0 0-3.66 2.6q-.33.37-.64.77a10.4 10.4 0 0 0-2.06 6.25q0 1.35.33 2.61a10.5 10.5 0 0 0 4.26 6.05q.33.22.67.42l.43.23a10.4 10.4 0 0 0 4.72 1.13h.18l.46-.02h.05a10.43 10.43 0 0 0 9.73-10.41Z" />
        </svg>
    );
}
