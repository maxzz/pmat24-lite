import { HTMLAttributes } from "react";
import { Button } from "@/ui";
import { classNames } from "@/utils";
import { panelHeaderClasses } from "../../1-left/0-header/1-left-layout";
import { IconMenuHamburger } from "@/ui/icons";

export function R_PanelHeader({className, ...rest}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(panelHeaderClasses, "flex items-center justify-between", className)} {...rest}>
            <div className="">File</div>

            <Button className="" variant={"ghost"} size={"xs"}>
                <IconMenuHamburger className="size-4 fill-current" />
            </Button>
        </div>
    );
}
