import { useSnapshot } from "valtio";
import { RightPanelViewAs, appSettings } from "@/store/9-ui-state";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";

export function MenuItem_ShowXML() {
    const { activeView } = useSnapshot(appSettings).right;
    return (
        <DropdownMenuCheckboxItem
            checked={activeView === RightPanelViewAs.xml}
            onCheckedChange={(checked) => appSettings.right.activeView = checked ? RightPanelViewAs.xml : RightPanelViewAs.forms}
        >
            Show XML
        </DropdownMenuCheckboxItem>
    );
}
