import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui/shadcn";
import { type MFormCtx, doCreateDefaultScriptItemsAtom, doDeleteAllChunksAtom } from "@/store";

export function MenuItem_Manual_ClearScriptActions({ formCtx }: { formCtx: MFormCtx; }) {
    const isManualForm = formCtx.manual;
    const isWebForm = useAtomValue(formCtx.options.isWebAtom); // manual mode not allowed for web
    const showIt = isManualForm && !isWebForm;
    const listIsEmpty = useAtomValue(formCtx.manual.chunksAtom).length === 0;
    const doDeleteAllChunks = useSetAtom(doDeleteAllChunksAtom);

    return (<>
        {showIt && (
            <DropdownMenuItem
                className="pl-8"
                disabled={listIsEmpty}
                onClick={() => {
                    doDeleteAllChunks(formCtx.manual);
                }}
            >
                Delete All Actions...
            </DropdownMenuItem>
        )}
    </>);
}

export function MenuItem_Manual_CreateDefaultScriptActions({ formCtx }: { formCtx: MFormCtx; }) {
    const isManualForm = formCtx.manual;
    const isWebForm = useAtomValue(formCtx.options.isWebAtom); // manual mode not allowed for web
    const showIt = isManualForm && !isWebForm;
    const doCreateDefaultScriptItems = useSetAtom(doCreateDefaultScriptItemsAtom);

    return (<>
        {showIt && (
            <DropdownMenuItem
                className="pl-8"
                onClick={(event) => {
                    doCreateDefaultScriptItems(formCtx, formCtx.fileUsCtx.formIdx, event.ctrlKey);
                }}
            >
                Add Actions Template
            </DropdownMenuItem>
        )}
    </>);
}
