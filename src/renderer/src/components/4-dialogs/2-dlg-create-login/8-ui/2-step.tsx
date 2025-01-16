import type { ReactNode, SVGAttributes } from "react";
import { classNames } from "@/utils";

export type StepItem = {
    label: ReactNode;
};

export const enum StatusEnum { // Former Timeline5WithAI from shadch-tv
    complete = "Completed",
    current = "In Progress", // i.e. in progress
    notStarted = "Not Started",
}

type StepProps = {
    idx: number;
    label: ReactNode;
    isLast?: boolean;
    status: StatusEnum;
};

export function Step({ idx, label, isLast, status }: StepProps) {
    const classes = status !== StatusEnum.notStarted ? stepClasses.complete : stepClasses.notStarted;
    const lineClasses = status === StatusEnum.complete ? lineStepClasses.complete : lineStepClasses.incomplete;
    const Icon = statusIcon(idx, status);
    return (
        <div className="flex items-start gap-4 [--size:40px] [--pt:8px]"> {/* as usual pt is half of a quarter of the size: (48:12) (32:4), but 24:1 */}
            <div className="flex flex-col items-center">

                <div className="relative size-[calc(var(--size))]">
                    <div className={`absolute inset-0 rounded-full ${classes.circleBorderClasses}`} />
                    <div className={`absolute inset-1 rounded-full ${classes.circleClasses} flex items-center justify-center`}>
                        {Icon}
                    </div>
                </div>

                {!isLast && <div className={`-mb-4 w-[2px] h-10 ${lineClasses}`} />}
            </div>

            <div className="flex-1 pt-[var(--pt)]">
                <p className="text-sm font-medium">{label}</p>
            </div>
        </div>
    );
}

function statusIcon(idx: number, status: StatusEnum) {
    return (
        status === StatusEnum.complete
            ? <CheckIcon className="size-4" />
            : status === StatusEnum.current
                ? <LoaderIcon className="size-4 1animate-spin" />
                : status === StatusEnum.notStarted
                    ? <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{idx + 1}</span>
                    : null
    );
}

const stepClasses = {
    complete: {
        circleClasses: "text-background bg-[#5c90f0]",
        circleBorderClasses: "bg-[#5c90f0]/50",
        statusClasses: "text-foreground",
    },
    notStarted: {
        circleClasses: "text-foreground",
        circleBorderClasses: "bg-foreground/10",
        statusClasses: "text-foreground/50",
    },
};

const lineStepClasses = {
    complete: "bg-[#5c90f0]",
    incomplete: "bg-[#5c90f0]/20",
};

function CheckIcon({ className, ...rest }: SVGAttributes<SVGElement>) {
    return (
        <svg
            className={classNames("fill-none stroke-current stroke-2", className)}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...rest}
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}

function LoaderIcon({ className, ...rest }: SVGAttributes<SVGElement>) {
    return (
        <svg
            className={classNames("fill-none stroke-current stroke-2", className)}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...rest}
        >
            <path d="M12 2v4" />
            <path d="m16.2 7.8 2.9-2.9" />
            <path d="M18 12h4" />
            <path d="m16.2 16.2 2.9 2.9" />
            <path d="M12 18v4" />
            <path d="m4.9 19.1 2.9-2.9" />
            <path d="M2 12h4" />
            <path d="m4.9 4.9 2.9 2.9" />
        </svg>
    );
}
