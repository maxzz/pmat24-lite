import { type HTMLAttributes } from "react"; //https://tabler.io/icons run
import { classNames } from "@/utils";

export function IconRun2({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-[1.5]", className)} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path d="M15 7a2 2 0 1 0 0-4a2 2 0 0 0 0 4m-2.387 1.267l-3.308 4.135l4.135 4.135l-2.067 4.55" />
            <path d="m6.41 9.508l3.387-3.309l2.816 2.068l2.895 3.308h3.722M8.892 15.71l-1.241.827H4.343" />
        </svg>
    );
}
