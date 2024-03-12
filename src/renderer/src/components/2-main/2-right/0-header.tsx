import { classNames } from "@/utils";
import { HTMLAttributes } from "react";
import { panelHeaderClasses } from "../1-left/0-header";

export function PanelHeader({className, ...rest}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(panelHeaderClasses, className)} {...rest}>
            File
        </div>
    );
}
