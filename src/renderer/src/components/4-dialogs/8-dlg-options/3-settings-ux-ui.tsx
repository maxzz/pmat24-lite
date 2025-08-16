import { useSnapshot } from "valtio";
import { appSettings, debugSettings } from "@/store/9-ui-state";
import { Checkbox, Label } from "@/ui";
import { subClasses, rowClasses } from "./8-shared-classes";
import { classNames } from "@/utils";
import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";

export function UiUxSettings() {
    const { debugAccess } = useSnapshot(debugSettings.debugOnly);
    const { showStatusbar, showOptOnRight, showWelcome, showWelcomeCheck, allowWelcome, showQuickXml, notifyNewFile, notifyAlienfiles } = useSnapshot(appSettings.appUi.uiGeneral);
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
                Notifications: Show popup when new file created
            </Label>
        </div>

        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox checked={notifyAlienfiles} onCheckedChange={(v) => liveUiGeneral.notifyAlienfiles = !!v} />
                Notifications: Show popup on attempt to open non-manifest files
            </Label>
        </div>

        {debugAccess && (<>
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
        </>)}

        <div className={subClasses}>
            <div className={rowClasses}>
                Color Theme
                <ThemeSwitch />
            </div>
        </div>
    </>
    );
}
