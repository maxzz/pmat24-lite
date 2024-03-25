import { HTMLAttributes } from "react";
import { R_PanelMenu } from "./2-menu";
import { panelHeaderClasses } from "../../1-left/0-header/0-left-layout";
import { classNames } from "@/utils";
import { Button } from "@/ui";
import { IconMenuHamburger } from "@/ui/icons";

export function R_PanelHeader({className, ...rest}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(panelHeaderClasses, "flex items-center justify-between", className)} {...rest}>
            <div className="">File</div>

            {/* <Button className="" variant="ghost" size="xs">
                <IconMenuHamburger className="size-4 fill-current" />
            </Button> */}

            <R_PanelMenu />
        </div>
    );
}
