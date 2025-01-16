import { ComponentProps, type ReactNode, type SVGAttributes } from "react";
import { atom, useAtom } from "jotai";
import { classNames } from "@/utils";
import { Button } from "@/ui/shadcn";

type StepItem = {
    label: ReactNode;
};

const enum StatusEnum {
    Completed = "Completed",
    InProgress = "In Progress",
    NotStarted = "Not Started",
}

const stepItems: StepItem[] = [
    { label: "Pick application", },
    { label: "Select fields and submit", },
    { label: "Name and options", },
    { label: "Save", },
];

const currentStepAtom = atom(1);

/**
 * Former Timeline5WithAI from shadch-tv
 */
export function Timeline5WithAI(props: ComponentProps<"div">) {
    const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
    return (
        <div className="my-4 flex flex-col gap-2 1debug" {...props}>

            <div className="p-4 bg-muted/20 flex flex-col items-start gap-4">
                {stepItems.map((item, idx) => {
                    const status =
                        idx < currentStep
                            ? StatusEnum.Completed
                            : idx === currentStep
                                ? StatusEnum.InProgress
                                : StatusEnum.NotStarted;
                    return (
                        <Step idx={idx} label={item.label} isLast={idx === stepItems.length - 1} status={status} key={idx} />
                    );
                })}
            </div>

            <div className="flex items-center justify-end gap-1">
                <Button variant="outline" size="xs" onClick={() => setCurrentStep((s) => s - 1)} disabled={currentStep < 0}>
                    Prev
                </Button>
                <Button variant="outline" size="xs" onClick={() => setCurrentStep((s) => s + 1)} disabled={currentStep >= stepItems.length}>
                    Next
                </Button>
            </div>
        </div>
    );
}

type StepClasses = {
    circleClasses: string;
    circleBorderClasses: string;
    statusClasses: string;
};

type StepClasses2 = {
    started: StepClasses;
    notStarted: StepClasses;
};

const acsentColor = "#5c90f0";

const stepClasses = {
    started: {
        circleClasses: "text-background bg-[#5c90f0]",
        circleBorderClasses: "bg-[#5c90f0]/50",
        statusClasses: "text-foreground",
    },
    notStarted: {
        circleClasses: "text-foreground",
        circleBorderClasses: "bg-foreground/10",
        statusClasses: "text-foreground/50",
    },
} as StepClasses2;

const lineStepClasses = {
    complete: "bg-[#5c90f0]",
    incomplete: "bg-[#5c90f0]/20",
};

type StepProps = {
    idx: number;
    label: ReactNode;
    isLast?: boolean;
    status: ReactNode;
};

function Step({ idx, label, isLast, status }: StepProps) {
    const classes = status !== StatusEnum.NotStarted ? stepClasses.started : stepClasses.notStarted;
    const lineClasses = status === StatusEnum.Completed ? lineStepClasses.complete : lineStepClasses.incomplete;

    const Icon =
        status === "Completed"
            ? <CheckIcon className="size-4" />
            : status === "In Progress"
                ? <LoaderIcon className="size-4 1animate-spin" />
                : status === "Not Started"
                    ? <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{idx + 1}</span>
                    : null;

    return (
        <div className="w-full flex items-start justify-between gap-4 [--size:32px] [--pt:4px]"> {/* as usual pt is half of a quarter of the size: (48:12) (32:4), but 24:1 */}

            <div className="flex items-start gap-4">
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

            <div className={`pt-[var(--pt)] text-sm font-medium ${classes.statusClasses}`}>{status}</div>
        </div>
    );
}

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
