import { useSnapshot } from "valtio";
import { appSettings, RightPanelViewType } from "@/store";
import { Button } from "@/ui";
import { SymbolCode } from "@/ui/icons";
import { classNames } from "@/utils";

export function ButtonQuickXml() {

    const { activeView } = useSnapshot(appSettings).right;
    const { showQuickXml } = useSnapshot(appSettings.appUi.uiGeneralState);

    if (!showQuickXml) {
        return null;
    }

    const isXml = activeView === RightPanelViewType.xml;

    function chageView() {
        return appSettings.right.activeView = isXml ? RightPanelViewType.forms : RightPanelViewType.xml;
    }

    return (
        <Button variant="ghost" className={classNames("-mr-4", isXml && "bg-muted")} onClick={chageView}>
            <SymbolCode className="size-4 fill-current" />
        </Button>
    );
}
