import { useSnapshot } from "valtio";
import { RightPanelViewType, appSettings } from "@/store";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";

export function MenuItem_ShowTextFieldsForMatch() {
    const { activeView } = useSnapshot(appSettings).right;
    return (
        <DropdownMenuCheckboxItem
            checked={activeView === RightPanelViewType.xml}
            onCheckedChange={(checked) => appSettings.right.activeView = checked ? RightPanelViewType.xml : RightPanelViewType.forms}
        >
            Show Text Fields for Match
        </DropdownMenuCheckboxItem>
    );
}
