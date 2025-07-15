import { HTMLAttributes, SVGAttributes } from "react";
import { classNames } from "@/utils"; // https://heroicons.com/close

export function IconRefresh({ className, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("stroke-none fill-current", className)} viewBox="0 0 300 300" {...rest}>
            {title && <title>{title}</title>}
            <path d="M67.54 25.27H1.04V0h86.45l13.3 13.3v86.45H75.52V50.54Q40.94 75.81 29.64 117.7q-11.3 41.89 5.98 81.8 17.29 39.9 55.2 60.51 37.91 20.62 80.47 13.3 42.56-7.31 71.16-39.24 28.59-31.92 31.92-75.14 3.32-43.23-20.62-78.47-23.94-35.25-65.17-48.55l6.65-23.94q33.25 10.64 57.85 33.92 24.61 23.27 36.57 55.2 11.97 31.92 9.31 65.84-2.66 33.91-19.95 63.18-17.29 29.26-45.88 48.54-28.59 19.29-62.51 23.94-33.92 4.65-66.5-5.99t-57.19-33.92q-24.6-23.28-36.57-55.19-11.97-31.92-9.31-65.84T21 74.47q17.29-29.26 46.55-49.21Z" />
        </svg>
    );
}
