import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";
import { type AnyFormCtx, type ManiAtoms, appSettings, maniAtiveTabToFormIdx } from "@/store";

export function MenuItem_ShowTextFieldsForMatch({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const { activeTab } = useSnapshot(appSettings.right.mani);
    const formIdx = maniAtiveTabToFormIdx(activeTab);
    
    const formCtx = formIdx !== undefined && maniAtoms[formIdx];
    if (!formCtx) {
        return null;
    }

    return (
        <MenuItem_Guarded formCtx={formCtx} />
    );
}

function MenuItem_Guarded({ formCtx }: { formCtx: AnyFormCtx; }) {
    const { showFormTextFields } = useSnapshot(appSettings.appUi.uiGeneral);
    const isNormalForm = formCtx.normal;
    const isWebForm = useAtomValue(formCtx.options.isWebAtom);

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

//05.27.25
//TODO: maybe put it to the additional options as a separate button
