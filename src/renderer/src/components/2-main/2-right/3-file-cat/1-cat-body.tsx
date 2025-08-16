import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { type FceCtx } from "@/store/3-field-catalog-atoms";
import { FldCatItemsGrid, SelectedItemPropsBody } from "@/components/4-dialogs/4-dlg-field-catalog";

export function FcViewBody({ fceCtx, className, ...rest }: { fceCtx: FceCtx; } & HTMLAttributes<HTMLDivElement>) {
    return (
        // <div className={classNames("size-full max-w-4xl grid grid-rows-[auto,1fr,auto]", className)} {...rest}>
        <div className={classNames("size-full max-w-4xl grid grid-rows-[1fr,auto]", className)} {...rest}>

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
