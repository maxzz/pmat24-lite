import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { DropdownMenuCheckboxItem, DropdownMenuItem } from "@/ui/shadcn";
import { type MFormCtx, type NFormCtx, appSettings } from "@/store";

export function MenuItem_Normal_ShowTextFields({ formCtx }: { formCtx: NFormCtx; }) {
    const isNormalForm = formCtx.normal;
    const isWebForm = useAtomValue(formCtx.options.isWebAtom);
    const showIt = isNormalForm && !isWebForm;
    
    const { showFormTextFields } = useSnapshot(appSettings.appUi.uiGeneral);

    return (<>
        {showIt && (
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

export function MenuItem_Manual_ClearScriptActions({ formCtx }: { formCtx: MFormCtx; }) {
    const isManualForm = formCtx.manual;
    const isWebForm = useAtomValue(formCtx.options.isWebAtom);
    const showIt = isManualForm && !isWebForm;
    const listIdEmpty = useAtomValue(formCtx.manual.chunksAtom).length === 0;
    
    return (<>
        {showIt && (
            <DropdownMenuItem
                disabled={listIdEmpty}
                onClick={() => {
                    //formCtx.manual.chunksAtom.set([]);
                }}
            >
                Delete Script Actions
            </DropdownMenuItem>
        )}
    </>);
}
