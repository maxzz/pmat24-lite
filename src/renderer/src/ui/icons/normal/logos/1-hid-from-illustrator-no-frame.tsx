import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function IconHIDWoFrame({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) { //#003087
    return (
        <svg className={classNames("fill-current stroke-none", className)} viewBox="0 0 22 5.92" {...rest}>
            {title && <title>{title}</title>}
            {/* <path fill="#b3b3b3" d="M0 0h24v24H0z" /> */}
            <path d="M7.9 5.89H4.94V3.36H2.96v2.53H0V0h2.96v2.53h1.98V0H7.9v5.89z" />
            <path d="M12.45 5.89H9.49V0h2.96v5.89z" />
            <path d="M18.78 5.92h-4.82V0h4.82C20.47 0 22 1.28 22 2.98s-1.54 2.95-3.22 2.95ZM16.73.47v4.85c1.21 0 1.92.21 1.92-2.41S17.83.47 16.73.47Z" />
        </svg>
    );
}

export function IconHIDWoFrameSquare({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) { //#003087
    return (
        <svg className={classNames("fill-current stroke-none", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            {/* <path fill="#b3b3b3" d="M0 0h24v24H0z" /> */}
            <path d="M8.9 14.93H5.94V12.4H3.96v2.53H1V9.04h2.96v2.53h1.98V9.04H8.9v5.89z" />
            <path d="M13.45 14.93h-2.96V9.04h2.96v5.89z" />
            <path d="M19.78 14.96h-4.82V9.04h4.82c1.69 0 3.22 1.28 3.22 2.98s-1.54 2.95-3.22 2.95Zm-2.05-5.45v4.85c1.21 0 1.92.21 1.92-2.41s-.82-2.44-1.92-2.44Z" />
        </svg>
    );
}
