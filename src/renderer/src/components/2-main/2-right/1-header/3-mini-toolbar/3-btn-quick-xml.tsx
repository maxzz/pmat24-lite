import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings, RightPanelViewType } from "@/store";
import { Button } from "@/ui";
import { SymbolCode } from "@/ui/icons";

export function ButtonQuickXml() {
    const { activeView } = useSnapshot(appSettings).right;
    const { showQuickXml } = useSnapshot(appSettings.appUi.uiGeneral);

    if (!showQuickXml) {
        return null;
    }

    const isXml = activeView === RightPanelViewType.xml;

    function chageView() {
        return appSettings.right.activeView = isXml ? RightPanelViewType.forms : RightPanelViewType.xml;
    }

    return (
        <Button variant="ghost" className={classNames(isXml && "bg-muted")} tabIndex={-1} onClick={chageView}>
            <SymbolCode className="size-4 fill-current" />
        </Button>
    );
}
