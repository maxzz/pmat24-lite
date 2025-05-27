import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";

export function MenuItem_ShowTextFieldsForMatch() {
    const { showFormTextFields } = useSnapshot(appSettings.appUi.uiGeneral);
    return (
        <DropdownMenuCheckboxItem
            checked={showFormTextFields}
            onCheckedChange={(checked) => appSettings.appUi.uiGeneral.showFormTextFields = checked}
        >
            Show Text Fields for Match
        </DropdownMenuCheckboxItem>
    );
}
