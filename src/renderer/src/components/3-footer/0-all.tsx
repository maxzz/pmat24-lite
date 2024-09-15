import { useSnapshot } from "valtio";
import { appSettings } from "@/store/app-settings";
import { BusyIndicator } from "./2-busy-indicator";
import { LoadedCounter } from "./1-loaded-counter";

export function SectionFooter() {
    const snapUiGeneral = useSnapshot(appSettings).appUi.uiGeneralState;
    return (<>
        {snapUiGeneral.showStatusbar && (
            <div className="px-2 py-1 min-h-9 bg-muted/20 border-border/50 border-t flex items-center justify-between">
                <LoadedCounter />
                <BusyIndicator />
            </div>
        )}
    </>);
}
