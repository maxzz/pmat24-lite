import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function PanelHeader({className, ...rest}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("px-3 py-2 text-xs bg-muted border-border border-b group-focus-within:bg-background/30 select-none", className)} {...rest}>
            Files
        </div>
    );
}
