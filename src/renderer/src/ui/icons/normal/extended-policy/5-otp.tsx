import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";

const cls1Classes = "fill-current stroke-none";
const cls3Classes = "fill-none";

export function IconExPol05Otp({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current stroke-none", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            {/* <path fill="#b3b3b3" stroke-width="0" d="M0 0h24v24H0z" /> */}
            <path className={cls3Classes} d="M15.97 11.86q-.99.07-1.38.75H8.3c-.45-.75-.32-1.45-.19-2.13 1.01-.41 6.25-.48 7.71-.1.32.45.25.96.16 1.48Z" />
            <path className={cls3Classes} d="M15.82 10.38c-1.45-.38-6.69-.31-7.71.1-.13.68-.27 1.38.19 2.13h6.29q.39-.68 1.38-.75c.09-.52.16-1.03-.16-1.48Z" />
            <path className={cls1Classes} d="M17.69 2.18c-.42-.23-.91-.14-1.38-.14h-6.19c-1.01 0-2.02-.02-3.03.01-.91.03-1.07.21-1.14 1.11v17.15c0 .47-.11.97.39 1.58 1.22.17 2.51.06 3.8.08 1.35.02 2.69.03 4.03 0 1.27-.03 2.56.14 3.78-.12.06-.31.11-.45.11-.59l.01-18.01c0-.38.01-.78-.38-1.06Zm-.64 16.36c-.98.29-7.82.37-9.77.11-.36-.95-.13-1.96-.17-2.94-.04-1 0-2 .08-3.1V4.16h9.77c.27 1.1.33 12.7.1 14.39Zm-3.99 2.3c-.39.32-.77.29-1.18.07-.23-.5-.04-.86.45-.92.59-.08.84.26.73.85Z" />
            <path className={cls1Classes} d="M16.97 11.25a3.05 3.05 0 0 0-.29-1.16.93.93 0 0 0-.71-.52l-.16-.03H8.39c-.25 0-.44.08-.62.2l-.05.07a4.38 4.38 0 0 0 .07 3.43s1.01.37 1.64.36l2.3-.02h3.51c.62-.01 1.21-.13 1.46-.8l.01-.03.1-.3.05-.21c.06-.26.09-.54.1-.83v-.15Zm-1 .61q-.99.07-1.38.75H8.3c-.45-.75-.32-1.45-.19-2.13 1.01-.41 6.25-.48 7.71-.1.32.45.25.96.16 1.48Z" />
            <path className={cls1Classes} d="m10.03 11.37.01-.32v-.02c-.81-.47-1.18-.45-1.51-.01-.32.41-.24.81.07 1.16.34.38.67.29 1.39-.34l.03-.46Z" />
            <path className={cls1Classes} d="M11.72 10.6c-.55-.15-.95 0-1.25.46 0 .3-.05.6-.05.91.7.53 1.16.61 1.5.22.53-.6.25-1.13-.2-1.59Z" />
            <path className={cls1Classes} d="M14.03 10.6c-.39-.19-.83.01-1.09.3-.25.27-.43.62-.18 1.03.15.25.31.46.64.47.47.02.79-.22.94-.58.15-.37.07-1.03-.31-1.22Z" />
        </svg>
    );
}

{/* <svg id="renders" viewBox="0 0 24 24">
    <defs>
        <style>
            .cls-1,.cls-3{fill:#000;stroke-width:0}.cls-3{fill:none}
        </style>
    </defs>
</svg>; */}
