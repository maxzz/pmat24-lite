import { type ComponentProps } from "react";
import { useAtomValue } from "jotai";
import { allScreenshotAtom } from "@/store";
import { RenaderTlwScreenshot } from "./2-renader-tlw-screenshot";
import { classNames } from "@/utils";

export function AppsGrid({ className, ...rest }: ComponentProps<"div">) {
    const items = useAtomValue(allScreenshotAtom);
    return (
        <div className={classNames("grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))] 1debug", className)} {...rest}>
            {items.map(
                (item, idx) => {
                    return <RenaderTlwScreenshot item={item} idx={idx} key={item.uuid} />;
                }
            )}
        </div>
    );
}
