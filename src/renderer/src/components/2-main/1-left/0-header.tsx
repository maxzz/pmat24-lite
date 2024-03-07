import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function PanelHeader({className, ...rest}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("px-3 py-2 text-xs bg-muted border-border border-b", className)} {...rest}>
            Files
        </div>
    );
}
