import { useSnapshot } from "valtio";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";
import { type ManiAtoms, appSettings } from "@/store";

export function MenuItem_ShowTextFieldsForMatch({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
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
