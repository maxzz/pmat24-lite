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

export function IconHIDWFrame({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) { //#003087 //height="996" width="2500"
    return (
        <svg className={classNames("fill-current stroke-none", className)} viewBox=".02194379 .02194379 26.14605621 10.43311242" {...rest}>
            {title && <title>{title}</title>}
            <path
                d="m25.374.688c0-.212.158-.37.37-.37s.37.158.37.37-.158.37-.37.37-.37-.158-.37-.37zm.344.45c.238 0 .45-.186.45-.45s-.212-.45-.45-.45-.45.185-.45.45c0 .238.211.45.45.45zm-.08-.424h.08l.132.212h.08l-.16-.238c.08 0 .133-.053.133-.132 0-.106-.053-.16-.185-.16h-.186v.53h.08v-.212zm0-.079v-.159h.106c.053 0 .106 0 .106.08s-.053.079-.132.079z" />
            <g fill="#00549b">
                <path
                    d="m23.786.132h-22.516a1.13 1.13 0 0 0 -1.138 1.138v7.937a1.13 1.13 0 0 0 1.138 1.138h22.516a1.13 1.13 0 0 0 1.138-1.138v-7.937c.026-.635-.504-1.138-1.138-1.138zm-14.076 7.726h-2.646v-2.248h-1.772v2.25h-2.646v-5.24h2.646v2.25h1.772v-2.25h2.646zm4.075 0h-2.646v-5.238h2.646zm5.662.027h-4.313v-5.266h4.313c1.508 0 2.884 1.138 2.884 2.646 0 1.482-1.376 2.62-2.884 2.62z" />
                <path d="m17.727 3.096v4.312c1.085 0 1.72.186 1.72-2.143 0-2.355-.741-2.17-1.72-2.17z" />
            </g>
        </svg>
    );
}
