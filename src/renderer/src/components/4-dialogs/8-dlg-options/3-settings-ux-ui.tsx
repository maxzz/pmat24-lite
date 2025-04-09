import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Checkbox, Label } from "@/ui";
import { subClasses, rowClasses } from "./8-shared-classes";
import { classNames } from "@/utils";

export function UiUxSettings() {
    const { showStatusbar, showOptOnRight, showWelcome, showWelcomeCheck, allowWelcome, showQuickXml, notifyNewFile } = useSnapshot(appSettings.appUi.uiGeneral);
    const liveUiGeneral = appSettings.appUi.uiGeneral;
    return (<>
        {allowWelcome && (<>
            <div className={subClasses}>
                <Label className={rowClasses}>
                    <Checkbox checked={showWelcome} onCheckedChange={(v) => liveUiGeneral.showWelcome = !!v} />
                    Show Welcome screen on start
                </Label>
            </div>

            <div className={classNames(subClasses, !showWelcome && "opacity-30 pointer-events-none")}>
                <Label className={rowClasses}>
                    <Checkbox checked={showWelcome && showWelcomeCheck} onCheckedChange={(v) => liveUiGeneral.showWelcomeCheck = !!v} />
                    Show Welcome screen next time on start checkbox
                </Label>
            </div>
        </>)}

        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox checked={showStatusbar} onCheckedChange={(v) => liveUiGeneral.showStatusbar = !!v} />
                Show status bar
            </Label>
        </div>

        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox checked={notifyNewFile} onCheckedChange={(v) => liveUiGeneral.notifyNewFile = !!v} />
                Show new file created notification
            </Label>
        </div>

        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox checked={showOptOnRight} onCheckedChange={(v) => liveUiGeneral.showOptOnRight = !!v} />
                Show manifest form option labels on the right side
            </Label>
        </div>

        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox checked={showQuickXml} onCheckedChange={(v) => liveUiGeneral.showQuickXml = !!v} />
                Show quick access button to XML manifest content
            </Label>
        </div>
    </>
    );
}
