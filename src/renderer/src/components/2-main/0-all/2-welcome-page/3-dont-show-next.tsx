import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Checkbox, Label } from "@/ui";
import { classNames } from "@/utils";

export function DontShowNext({ className }: HTMLAttributes<HTMLLabelElement>) {
    const dontShowWelcome = !useSnapshot(appSettings.appUi.uiGeneral).showWelcome;

    return (
        <Label className={classNames("text-xs flex items-center gap-1", className)}>
            <Checkbox
                className="size-4"
                checked={dontShowWelcome}
                onClick={() => appSettings.appUi.uiGeneral.showWelcome = false}
            />
            
            Don't show this page next time
        </Label>
    );
}
