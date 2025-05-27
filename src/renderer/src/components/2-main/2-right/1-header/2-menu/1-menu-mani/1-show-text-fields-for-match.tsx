import { useSnapshot } from "valtio";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";
import { type ManiAtoms, appSettings, maniAtiveTabToFormIdx } from "@/store";

export function MenuItem_ShowTextFieldsForMatch({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const { showFormTextFields } = useSnapshot(appSettings.appUi.uiGeneral);
    const { activeTab } = useSnapshot(appSettings.right.mani);
    const formIdx = maniAtiveTabToFormIdx(activeTab);
    const isNormalForm = formIdx !== undefined && maniAtoms[formIdx]?.normal;
    return (<>
        {isNormalForm && (
            <DropdownMenuCheckboxItem
                disabled={!isNormalForm}
                checked={showFormTextFields}
                onCheckedChange={(checked) => appSettings.appUi.uiGeneral.showFormTextFields = checked}
            >
                Show Text Fields for Match
            </DropdownMenuCheckboxItem>
        )}
    </>);
}
