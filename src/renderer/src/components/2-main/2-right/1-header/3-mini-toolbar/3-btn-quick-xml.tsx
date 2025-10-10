import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { Button } from "@/ui";
import { SymbolCode } from "@/ui/icons";
import { appSettings, RightPanelViewAs } from "@/store/9-ui-state";

export function ButtonQuickXml() {
    const { activeView } = useSnapshot(appSettings).right;
    const { showQuickXml } = useSnapshot(appSettings.appUi.uiGeneral);

    if (!showQuickXml) {
        return null;
    }

    const isXml = activeView === RightPanelViewAs.xml;

    function chageView() {
        return appSettings.right.activeView = isXml ? RightPanelViewAs.forms : RightPanelViewAs.xml;
    }

    return (
        <Button variant="ghost" className={classNames(isXml && "bg-muted")} tabIndex={-1} onClick={chageView}>
            <SymbolCode className="size-4 fill-current" />
        </Button>
    );
}
