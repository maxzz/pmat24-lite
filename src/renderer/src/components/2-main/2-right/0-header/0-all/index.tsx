import { HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { R_PanelMenu } from "../2-menu";
import { panelHeaderClasses } from "../../../1-left/0-header/0-all";
import { XmlSwitch } from "../3-xml-switch";
import { rightPanelSelectedContentAtom } from "@/store";
import { TitleNoFile } from "./1-title-no-file";
import { TitleWithFileUs } from "./2-title-with-file-us";
import { classNames } from "@/utils";

export function R_PanelHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const fileUs = useAtomValue(rightPanelSelectedContentAtom);
    if (!fileUs) {
        return (
            <div className={classNames(panelHeaderClasses, "h-10 flex items-start justify-between", className)} {...rest}>
                <TitleNoFile />
            </div>
        );
    }
    return (
        <div className={classNames(panelHeaderClasses, "flex items-start justify-between", className)} {...rest}>
            <TitleWithFileUs fileUs={fileUs} />

            <div className="flex items-center gap-4">
                <XmlSwitch />
                <R_PanelMenu />
            </div>
        </div>
    );
}
