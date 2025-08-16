import { useAtomValue } from "jotai";
import { type FceCtx } from "@/store/3-field-catalog-atoms";

const ixsClasses = "\
absolute top-1 right-1.5 p-1 h-4 aspect-square text-xs \
text-muted-foreground \
rounded-sm select-none cursor-default \
flex items-center justify-center";

export function ViewOfSelectedIndex({ fceCtx }: { fceCtx: FceCtx; }) {
    const selectedIdx = useAtomValue(fceCtx.selectedIdxStoreAtom);
    return (
        <div className={ixsClasses}>
            {selectedIdx === -1 ? '' : `${selectedIdx + 1}`}
        </div>
    );
}

export function ViewOfSelectedId({ fceCtx }: { fceCtx: FceCtx; }) {
    const selectedItem = useAtomValue(fceCtx.selectedItemAtom);
    const openMainDlg = !fceCtx.inData?.openItemPickerDlg;
    return (<>
        {openMainDlg && (
            <div className="pt-1 text-[.65rem] h-4 text-muted-foreground">
                ID: {selectedItem ? selectedItem.fieldValue.dbname : 'No item selected'}
            </div>
        )}
    </>);
}
