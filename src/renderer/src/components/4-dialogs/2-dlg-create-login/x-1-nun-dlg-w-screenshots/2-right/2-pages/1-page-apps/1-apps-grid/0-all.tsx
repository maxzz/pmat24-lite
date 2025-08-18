import { type ComponentProps } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { allScreenshotAtom } from "@/store/7-napi-atoms";
import { TlwRendererSelector } from "./1-tlw-renderer-selector";

export function AppsGrid({ className, ...rest }: ComponentProps<"div">) {
    const items = useAtomValue(allScreenshotAtom);
    return (
        <div className={classNames("grid gap-1 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]", className)} {...rest}>
            {items.map(
                (item, idx) => <TlwRendererSelector item={item} idx={idx} key={item.uuid} />
            )}
        </div>
    );
}
