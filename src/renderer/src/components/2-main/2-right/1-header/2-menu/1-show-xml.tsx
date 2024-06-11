import { useSnapshot } from "valtio";
import { RightPanelViewType, appSettings } from "@/store";
import { DropdownMenuCheckboxItem, DropdownMenuItem } from "@/ui/shadcn";
import { notImplYet } from "@/ui/not-impl-yet";

export function MenuItem_ShowXML() {
    const { view } = useSnapshot(appSettings).rightPanel.panelView;
    return (
        <DropdownMenuCheckboxItem
            checked={view === RightPanelViewType.xml}
            onCheckedChange={(checked) => appSettings.rightPanel.panelView.view = checked ? RightPanelViewType.xml : RightPanelViewType.forms}
        >
            Show XML
        </DropdownMenuCheckboxItem>
    );
}
//(checked) => appSettings.rightPanel.rightPanelState.view = checked ? RightPanelView.xml : RightPanelView.forms