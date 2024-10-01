import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Checkbox, Label } from "@/ui";
import { classNames } from "@/utils";

export function DontShowNext({ className }: HTMLAttributes<HTMLLabelElement>) {
    const showWelcome = useSnapshot(appSettings.appUi.uiGeneralState).showWelcome;

    return (
        <Label className={classNames("flex items-center gap-1", className)}>
            <Checkbox
                className="size-4"
                checked={showWelcome}
                onClick={() => appSettings.appUi.uiGeneralState.showWelcome = false}
            />
            
            Don't show this page next time
        </Label>
    );
}
