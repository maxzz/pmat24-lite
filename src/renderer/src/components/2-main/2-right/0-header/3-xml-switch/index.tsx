import { RightPanelView, appSettings } from "@/store";
import { Switch } from "@/ui";
import { SymbolCode } from "@/ui/icons";
import { useSnapshot } from "valtio";

export function XmlSwitch() {
    const { view } = useSnapshot(appSettings).rightPanel.rightPanelState;
    return (
        <div className="text-[0.55rem] flex flex-col items-center gap-1">
            <div className="flex items-center justify-between gap-2">
                <div className="">Forms</div>
                <SymbolCode className="size-3"/>
            </div>
            <Switch
                className="w-7 h-2"
                thumbClasses="data-[state=checked]:translate-x-3"
                checked={view === RightPanelView.xml}
                onCheckedChange={(checked) => appSettings.rightPanel.rightPanelState.view = checked ? RightPanelView.xml : RightPanelView.forms}
            />
        </div>
    );
}
