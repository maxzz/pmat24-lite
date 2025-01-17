import { type ComponentProps } from "react";
import reply from "@/assets/tests/25.01.16.25/TopLevelWindowsScreenshots.json";
import { GetTlwScreenshotsResult } from "@shared/ipc-types";

console.log("AppsGrid", reply);

export function AppsGrid({ className, ...rest }: ComponentProps<"div">) {
    const data = reply as GetTlwScreenshotsResult;
    return (
        <div className={className} {...rest}>
            <div className="grid grid-cols-1 1debug">
                {data.map((item, idx) => {
                    if (item.type === 'error') {
                        // const res = null;
                        const res = <div className="flex flex-col gap-4" key={idx}>error</div>;
                        return res;
                    }
                    return (
                        <div className="flex flex-col gap-4" key={idx}>
                            <div className="text-sm font-semibold">{item.caption}</div>
                            <div className="text-xs">{item.caption}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
