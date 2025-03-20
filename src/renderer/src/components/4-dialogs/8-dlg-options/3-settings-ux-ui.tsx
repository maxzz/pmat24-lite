import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Checkbox, Label } from "@/ui";
import { subClasses, rowClasses } from "./8-shared-classes";

export function UiUxSettings() {
    const { showStatusbar, showOptOnRight, showWelcome, showQuickXml } = useSnapshot(appSettings.appUi.uiGeneral);
    const liveUiGeneral = appSettings.appUi.uiGeneral;
    return (<>
        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox checked={showWelcome} onCheckedChange={(v) => liveUiGeneral.showWelcome = !!v} />
                Show Welcome screen on start
            </Label>
        </div>

        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox checked={showStatusbar} onCheckedChange={(v) => liveUiGeneral.showStatusbar = !!v} />
                Show status bar
            </Label>
        </div>

        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox checked={showQuickXml} onCheckedChange={(v) => liveUiGeneral.showQuickXml = !!v} />
                Show quick access button to XML manifest content
            </Label>
        </div>

        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox checked={showOptOnRight} onCheckedChange={(v) => liveUiGeneral.showOptOnRight = !!v} />
                Show manifest form option labels on the right side
            </Label>
        </div>
    </>
    );
}
