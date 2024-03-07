import { classNames } from "@/utils";
import { HTMLAttributes } from "react";

export function PanelHeader({className, ...rest}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("px-3 py-2 text-xs bg-muted border-border border-b", className)} {...rest}>
            File
        </div>
    );
}
