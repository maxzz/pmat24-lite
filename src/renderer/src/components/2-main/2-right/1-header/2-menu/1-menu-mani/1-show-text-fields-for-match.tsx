import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";
import { type AnyFormAtoms, type ManiAtoms, appSettings, maniAtiveTabToFormIdx } from "@/store";

export function MenuItem_ShowTextFieldsForMatch({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const { activeTab } = useSnapshot(appSettings.right.mani);
    const formIdx = maniAtiveTabToFormIdx(activeTab);
    const formAtoms = formIdx !== undefined && maniAtoms[formIdx];
    if (!formAtoms) {
        return null;
    }

    return (
        <MenuItem_Guarded formAtoms={formAtoms} />
    );
}

function MenuItem_Guarded({ formAtoms }: { formAtoms: AnyFormAtoms; }) {
    const { showFormTextFields } = useSnapshot(appSettings.appUi.uiGeneral);
    const isNormalForm = formAtoms.normal;
    const isWebForm = useAtomValue(formAtoms.options.isWebAtom);
    
    return (<>
        {isNormalForm && !isWebForm && (
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
