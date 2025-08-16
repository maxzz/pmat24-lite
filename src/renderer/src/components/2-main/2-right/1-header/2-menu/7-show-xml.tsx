import { useSnapshot } from "valtio";
import { RightPanelViewType, appSettings } from "@/store/9-ui-state";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";

export function MenuItem_ShowXML() {
    const { activeView } = useSnapshot(appSettings).right;
    return (
        <DropdownMenuCheckboxItem
            checked={activeView === RightPanelViewType.xml}
            onCheckedChange={(checked) => appSettings.right.activeView = checked ? RightPanelViewType.xml : RightPanelViewType.forms}
        >
            Show XML
        </DropdownMenuCheckboxItem>
    );
}
