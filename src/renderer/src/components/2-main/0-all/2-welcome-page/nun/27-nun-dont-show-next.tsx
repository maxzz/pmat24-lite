import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { Checkbox, Label } from "@/ui";
import { appSettings } from "@/store/9-ui-state";

export function DontShowNext({ className }: HTMLAttributes<HTMLLabelElement>) {
    const dontShowWelcome = !useSnapshot(appSettings.appUi.uiGeneral).showWelcome;

    return (
        <Label className={classNames("text-xs flex items-center gap-1", className)}>
            <Checkbox
                className="size-4"
                checked={dontShowWelcome}
                onClick={() => appSettings.appUi.uiGeneral.showWelcome = false}
            />
            
            Do not show this welcome page
        </Label>
    );
}
