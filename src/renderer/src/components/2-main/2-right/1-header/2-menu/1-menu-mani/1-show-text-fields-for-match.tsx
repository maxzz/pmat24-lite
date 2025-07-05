import { useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { DropdownMenuCheckboxItem, DropdownMenuItem } from "@/ui/shadcn";
import { type MFormCtx, type NFormCtx, appSettings, doDeleteAllChunksAtom } from "@/store";

export function MenuItem_Normal_ShowTextFields({ formCtx }: { formCtx: NFormCtx; }) {
    const isNormalForm = formCtx.normal;
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

export function MenuItem_Manual_ClearScriptActions({ formCtx }: { formCtx: MFormCtx; }) {
    const isManualForm = formCtx.manual;
    const isWebForm = useAtomValue(formCtx.options.isWebAtom);
    const showIt = isManualForm && !isWebForm;
    const listIsEmpty = useAtomValue(formCtx.manual.chunksAtom).length === 0;
    const doDeleteAllChunks = useSetAtom(doDeleteAllChunksAtom);

    return (<>
        {showIt && (
            <DropdownMenuItem
                disabled={listIsEmpty}
                onClick={() => {
                    doDeleteAllChunks(formCtx.manual);
                }}
            >
                Delete Script Actions
            </DropdownMenuItem>
        )}
    </>);
}

//05.27.25
//TODO: maybe put it to the additional options as a separate button
