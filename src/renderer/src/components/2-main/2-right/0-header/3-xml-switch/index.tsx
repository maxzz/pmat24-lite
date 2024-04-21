import { RightPanelView, appSettings } from "@/store";
import { Switch } from "@/ui";
import { useSnapshot } from "valtio";

export function XmlSwitch() {
    const { view } = useSnapshot(appSettings.ui).rightPanelOptions.rightPanelState;
    return (
        <div className="text-[0.55rem] flex items-center gap-1">
            Forms
            <Switch
                className="w-7 h-2"
                thumbClasses="data-[state=checked]:translate-x-3"
                checked={view === RightPanelView.xml}
                onCheckedChange={(checked) => appSettings.ui.rightPanelOptions.rightPanelState.view = checked ? RightPanelView.xml : RightPanelView.forms}
            />
            Xml
        </div>
    );
}
