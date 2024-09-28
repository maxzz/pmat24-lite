import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconExPol09Fingerprint({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current stroke-none", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            {/* <path fill="#b3b3b3" stroke-width="0" d="M0 0h24v24H0z" /> */}
            <path d="M13.78 9.98c-.08 2.24-1.38 3.96-3.68 4.79-.71.26-1.47.41-2.2.6-.21.05-.44.01-.48-.25-.04-.25.16-.37.37-.43.56-.17 1.14-.3 1.7-.48 2.37-.74 3.51-2.18 3.48-4.33-.01-.64-.13-1.22-.87-1.31-.73-.09-1.07.39-1.22 1.02-.31 1.35-1.05 2.32-2.4 2.76-.29.09-.61.1-.92.12-.2 0-.45-.02-.49-.27-.04-.27.19-.36.4-.37 1.66-.1 2.4-1.1 2.75-2.62.25-1.08 1.11-1.52 2.14-1.33.93.17 1.47.97 1.43 2.11Z" />
            <path d="M15.25 10.7c-.13 1.02-.06 2.09 1.26 2.6.15.06.3.22.2.42-.12.23-.34.19-.55.16-.86-.13-1.65-1.1-1.73-2.22-.05-.62 0-1.24 0-1.87-.03-1.53-.86-2.56-2.18-2.71-1.27-.15-2.36.63-2.76 2.01-.16.54-.31 1.06-.74 1.46-.32.3-.68.47-1.13.43-.21-.02-.45-.06-.49-.3-.04-.27.2-.34.41-.37.68-.11.96-.57 1.16-1.17.71-2.14 2.04-3.04 3.91-2.71 1.64.29 2.68 1.82 2.65 3.92v.36Z" />
            <path d="M16.7 10.26c0 .55-.08 1.11.18 1.63.08.16.1.35-.07.46-.21.13-.4.02-.55-.14-.49-.51-.43-1.15-.35-1.77.11-.85.05-1.66-.3-2.44a3.85 3.85 0 0 0-3.79-2.39c-1.77.09-2.94 1.05-3.66 2.63-.16.35-.1 1.13-.71.88-.44-.19-.07-.82.08-1.21a4.72 4.72 0 0 1 5.36-2.95 4.73 4.73 0 0 1 3.81 4.36c.02.31 0 .62 0 .93Z" />
            <path d="M12.6 14.89c1.25.21 2.21.96 3.32 1.34.09.03.18.22.17.33-.02.22-.23.25-.4.23a3.68 3.68 0 0 1-1.65-.59c-.9-.59-1.77-.58-2.75-.2-.83.32-1.72.51-2.59.73-.29.07-.69.21-.79-.2-.09-.35.31-.4.56-.47l4.14-1.17Z" />
            <path d="M12.27 10.11a3.85 3.85 0 0 1-2.24 3.14c-.68.35-1.43.51-2.17.66-.26.05-.62.15-.71-.19-.12-.45.32-.45.59-.53.36-.11.74-.16 1.1-.27 1.43-.43 2.44-1.25 2.66-2.82.04-.3.07-.71.49-.66.35.04.31.4.28.67Z" />
            <path d="m12.3 17.23-2.3.63c-.3.08-.61.13-.92.17-.18.02-.36-.08-.37-.27 0-.1.12-.24.22-.32 1.43-1.06 4.55-1.09 6-.07.17.12.4.22.28.47-.11.23-.34.18-.55.14-.74-.17-1.35-.72-2.36-.74Z" />
            <path d="M11.96 18.03c.81-.02 1.31.11 1.78.34.19.09.39.21.32.46-.07.26-.32.28-.51.19-.99-.47-1.97-.17-2.95.03-.26.05-.62.15-.72-.19-.12-.4.28-.41.53-.48.6-.16 1.21-.28 1.55-.35Z" />
            <path d="M13.52 13.8c.03-.38.33-.39.56-.2a7.5 7.5 0 0 0 2.16 1.15c.16.06.32.17.25.38-.02.08-.12.16-.21.2-.57.25-2.69-.89-2.77-1.52Z" />
        </svg>
    );
}