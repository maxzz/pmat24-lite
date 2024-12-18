import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { FldCatItemsGrid } from "@/components/4-dialogs/4-field-catalog/2-items-grid";
import { classNames } from "@/utils";
import { FieldCatalogToolbar } from "@/components/4-dialogs/4-field-catalog/1-toolbar";
import { SelectedItemPropsBody } from "@/components/4-dialogs/4-field-catalog/3-selected-item-props/1-props-body";

export function FcViewBody({ fileUsAtom, className, ...rest }: { fileUsAtom: FileUsAtom; } & HTMLAttributes<HTMLDivElement>) {

    const fileUs = useAtomValue(fileUsAtom);
    const fceCtx = fileUs.fceAtomsForFcFile?.viewFceCtx;
    if (!fceCtx) {
        return <div>No body</div>;
    }
    
    return (
        // <div className={classNames("h-full w-full max-w-4xl grid grid-rows-[auto,1fr,auto]", className)} {...rest}>
        <div className={classNames("h-full w-full max-w-4xl grid grid-rows-[1fr,auto]", className)} {...rest}>

            {/* <div className="relative mx-3 my-2 p-2 border-border border rounded-md">
                <FieldCatalogToolbar fceCtx={fceCtx} />
            </div> */}

            <FldCatItemsGrid fceCtx={fceCtx} />

            <div className="relative mx-3 my-2 p-2 border-border border rounded-md">
                <SelectedItemPropsBody fceCtx={fceCtx} />
            </div>
        </div>
    );
}

//TODO: show warning field catalog changes will be replicated to all manifests only after save
//TODO: add to editor data: fromFile member
