import { type ComponentProps } from "react";
import { useAtomValue } from "jotai";
import { allScreenshotAtom } from "@/store";
import { RenaderTlwScreenshot } from "./1-renader-tlw-guard";
import { classNames } from "@/utils";

export function AppsGrid({ className, ...rest }: ComponentProps<"div">) {
    const items = useAtomValue(allScreenshotAtom);
    return (
        <div className={classNames("grid gap-1 grid-cols-[repeat(auto-fill,minmax(160px,1fr))] 1debug", className)} {...rest}>
            {items.map(
                (item, idx) => {
                    return <RenaderTlwScreenshot item={item} idx={idx} key={item.uuid} />;
                }
            )}
        </div>
    );
}
