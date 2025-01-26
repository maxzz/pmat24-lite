import { type ComponentProps } from "react";
import { useAtomValue } from "jotai";
import { allScreenshotAtom } from "@/store";
import { TlwRendererSelector } from "./1-tlw-renderer-selector";
import { classNames } from "@/utils";

export function AppsGrid({ className, ...rest }: ComponentProps<"div">) {
    const items = useAtomValue(allScreenshotAtom);
    return (
        <div className={classNames("grid gap-1 grid-cols-[repeat(auto-fill,minmax(160px,1fr))] 1debug", className)} {...rest}>
            {items.map(
                (item, idx) => {
                    return <TlwRendererSelector item={item} idx={idx} key={item.uuid} />;
                }
            )}
        </div>
    );
}
