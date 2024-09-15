import { useSnapshot } from "valtio";
import { appSettings } from "@/store/app-settings";
import { BusyIndicator } from "@/ui/local-ui";

export function SectionFooter() {
    const snapUiGeneral = useSnapshot(appSettings).appUi.uiGeneralState;
    return (<>
        {snapUiGeneral.showStatusbar && (
            <div className="p-1.5 bg-muted">
                <BusyIndicator />
            </div>
        )}
    </>);
}
