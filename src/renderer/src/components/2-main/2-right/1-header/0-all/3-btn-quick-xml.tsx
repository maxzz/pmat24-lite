import { useSnapshot } from "valtio";
import { appSettings, RightPanelViewType } from "@/store";
import { Button } from "@/ui";
import { SymbolCode } from "@/ui/icons";

export function ButtonQuickXml() {

    const { activeView } = useSnapshot(appSettings).right;
    const { showQuickXml } = useSnapshot(appSettings.appUi.uiGeneralState);

    if (!showQuickXml) {
        return null;
    }

    function chageView() {
        return appSettings.right.activeView = activeView === RightPanelViewType.forms ? RightPanelViewType.xml : RightPanelViewType.forms;
    }

    return (
        <Button variant="ghost" className="-mr-4" onClick={chageView}>
            <SymbolCode className="size-4 fill-current" />
        </Button>
    );
}
