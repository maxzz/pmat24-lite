import { RightPanelView, appSettings } from "@/store";
import { Switch } from "@/ui";
import { SymbolCode, SymbolForms } from "@/ui/icons";
import { useSnapshot } from "valtio";

export function XmlSwitch() {
    const { view } = useSnapshot(appSettings).rightPanel.rightPanelState;
    return (
        <div className="text-[0.55rem] flex flex-col items-center gap-1.5">
            
            <div className="text-muted-foreground flex items-center justify-between gap-2">
                <SymbolForms className="size-2.5" title="Forms" />
                <SymbolCode className="size-2.5" title="XML" />
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
