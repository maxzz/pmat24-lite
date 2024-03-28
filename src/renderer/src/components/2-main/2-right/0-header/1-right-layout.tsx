import { HTMLAttributes } from "react";
import { R_PanelMenu } from "./2-menu";
import { panelHeaderClasses } from "../../1-left/0-header/0-left-layout";
import { classNames } from "@/utils";
import { Button } from "@/ui";
import { IconMenuHamburger } from "@/ui/icons";
import { RightTitle } from "./1-title";
import { XmlSwitch } from "./3-xml-switch";

export function R_PanelHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(panelHeaderClasses, "flex items-start justify-between", className)} {...rest}>
            <RightTitle />

            {/* <Button className="" variant="ghost" size="xs">
                <IconMenuHamburger className="size-4 fill-current" />
            </Button> */}

            <div className="flex items-center gap-4">
                <XmlSwitch />
                <R_PanelMenu />
            </div>
        </div>
    );
}
