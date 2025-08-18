import { HTMLAttributes, SVGAttributes } from "react"; //https://heroicons.com/fire
import { classNames } from "@/utils";

export function SvgSymbolFire() {
    return (<>
        <symbol id="icon-fire" viewBox="0 0 24 24">
            <path className="fill-[var(--fill-a,none)] stroke-[var(--stroke-a,currentColor)]" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
            <path className="fill-[var(--fill-b,none)] stroke-[var(--stroke-b,currentColor)]" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
        </symbol>
    </>);
}

const fireIconClasses = "fill-none stroke-current stroke-[1.5]";
const fireColorClasses = "[--fill-a:#ea580c] [--fill-b:#fff7ed]"; //fill-orange-600 #ea580c fill-orange-50  #fff7ed

type SymbolFireProps = SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement> & {
    colorize?: boolean;
};

export function SymbolFire({ className, children, title, colorize, ...rest }: SymbolFireProps) {
    return (
        <svg className={classNames(fireIconClasses, colorize && fireColorClasses, className)} strokeLinecap="round" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-fire" />
        </svg>
    );
}
