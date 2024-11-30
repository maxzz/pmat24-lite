import { useAtomValue } from "jotai";
import { type FceCtx } from "@/store";

const ixsClasses = "\
absolute top-1 right-2 mt-1 p-1 h-4 aspect-square text-xs \
text-muted-foreground \
rounded-sm select-none cursor-default \
flex items-center justify-center";

export function SelectedIdxView({ fceCtx }: { fceCtx: FceCtx; }) {
    const selectedIdx = useAtomValue(fceCtx.selectedIdxStoreAtom);
    return (
        <div className={ixsClasses}>
            {selectedIdx === -1 ? '' : `${selectedIdx + 1}`}
        </div>
    );
}

export function SelectedIdView({ fceCtx }: { fceCtx: FceCtx; }) {
    const selectedItem = useAtomValue(fceCtx.selectedItemAtom);
    return (<>
        {!fceCtx.isDlgCtx && (
            <div className="pt-1 text-[.65rem] h-4 text-muted-foreground">
                ID: {selectedItem ? selectedItem.fieldValue.dbname : 'No item selected'}
            </div>
        )}
    </>);
}
