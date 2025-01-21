import { type ComponentProps } from "react";
import { type GetTlwScreenshotsResult } from "@shared/ipc-types";
// import replyTest from "@/assets/tests/25.01.16.25/TopLevelWindowsScreenshots.json";
import replyTest from "@/assets/tests/25.01.16.25/TopLevelWindowsScreenshots2many.json";
import { classNames } from "@/utils";
import { RenaderTlwScreenshot } from "./2-renader-tlw-screenshot";

// console.log("AppsGrid", reply);

export function AppsGrid({ className, ...rest }: ComponentProps<"div">) {
    const data = replyTest as GetTlwScreenshotsResult;
    return (
        <div className={classNames("grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))] 1debug", className)} {...rest}>
            {data.map(
                (item, idx) => {
                    return <RenaderTlwScreenshot item={item} idx={idx} key={idx} />;
                }
            )}
        </div>
    );
}
