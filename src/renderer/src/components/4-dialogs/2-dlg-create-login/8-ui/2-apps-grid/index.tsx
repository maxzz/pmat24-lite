import { type ComponentProps } from "react";
// import reply from "@/assets/tests/25.01.16.25/TopLevelWindowsScreenshots.json";

// console.log("AppsGrid", reply);

export function AppsGrid({ className, ...rest }: ComponentProps<"div">) {
    return (
        <div className="grid grid-cols-1 1debug" {...rest}>
            <div className="flex flex-col gap-4">
                <div className="text-sm font-semibold">Apps</div>
                <div className="text-xs">Select apps to train</div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="text-sm font-semibold">Apps</div>
                <div className="text-xs">Select apps to train</div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="text-sm font-semibold">Apps</div>
                <div className="text-xs">Select apps to train</div>
            </div>
        </div>
    );
}
