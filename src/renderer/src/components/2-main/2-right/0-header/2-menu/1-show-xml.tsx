import { useSnapshot } from "valtio";
import { RightPanelView, appSettings } from "@/store";
import { DropdownMenuCheckboxItem, DropdownMenuItem } from "@/ui/shadcn";
import { notImplYet } from "@/ui/not-impl-yet";

export function MenuItem_ShowXML() {
    const { view } = useSnapshot(appSettings).rightPanel.rightPanelState;
    return (
        <DropdownMenuCheckboxItem
            checked={view === RightPanelView.xml}
            onCheckedChange={(checked) => appSettings.rightPanel.rightPanelState.view = checked ? RightPanelView.xml : RightPanelView.forms}
        >
            Show XML
        </DropdownMenuCheckboxItem>
    );
}
//(checked) => appSettings.rightPanel.rightPanelState.view = checked ? RightPanelView.xml : RightPanelView.forms