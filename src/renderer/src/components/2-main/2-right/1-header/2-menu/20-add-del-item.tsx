import { useSnapshot } from "valtio";
import { RightPanelViewType, appSettings } from "@/store";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";

export function MenuItem_AddDelItem() {
    const { activeView } = useSnapshot(appSettings).right;
    return (
        <DropdownMenuCheckboxItem
            checked={activeView === RightPanelViewType.xml}
            onCheckedChange={(checked) => appSettings.right.activeView = checked ? RightPanelViewType.xml : RightPanelViewType.forms}
        >
            Show XML
        </DropdownMenuCheckboxItem>
    );
}

// export function Button_DeleteItem({ fceCtx }: { fceCtx: FceCtx; }) {
//     const selectedItem = useAtomValue(fceCtx.selectedItemAtom);
    
//     const doDeleteSelectedItem = useSetAtom(doDeleteSelectedItemAtom);
//     return (
//         <Button variant="ghost" disabled={!selectedItem} title="Delete current item" tabIndex={-1} onClick={() => doDeleteSelectedItem(fceCtx)}>
//             Delete
//         </Button>
//     );
// }

//TODO: atom to set focus and reset after focus set
