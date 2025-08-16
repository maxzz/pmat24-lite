import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";
import { appSettings } from "@/store/9-ui-state";
import { type NFormCtx } from "@/store/2-file-mani-atoms";

export function MenuItem_Normal_ShowTextFields({ formCtx }: { formCtx: NFormCtx; }) {
    const isNormalForm = formCtx.normal; //TODO: This is always true by context
    const isWebForm = useAtomValue(formCtx.options.isWebAtom);
    const showIt = isNormalForm && !isWebForm; // If not manual mode and win32 then show this menu item

    const { showFormTextFields } = useSnapshot(appSettings.appUi.uiGeneral);

    return (<>
        {showIt && (
            <DropdownMenuCheckboxItem
                disabled={!isNormalForm} //TODO: this is rely does not make sense
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
