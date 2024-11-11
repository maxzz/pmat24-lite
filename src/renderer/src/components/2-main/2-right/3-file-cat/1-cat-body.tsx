import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { FldCatItemsGrid } from "@/components/4-dialogs/4-field-catalog/2-items-grid";
import { classNames } from "@/utils";
import { DialogFieldCatalogBody } from "@/components/4-dialogs/4-field-catalog/0-all/1-dialog-body";
import { RightPanelGuard } from "@/components/4-dialogs/4-field-catalog/3-selected-item-props";
import { SelectedItemBody } from "@/components/4-dialogs/4-field-catalog/3-selected-item-props/1-body";

export function FcViewBody({ fileUsAtom, className, ...rest }: { fileUsAtom: FileUsAtom; } & HTMLAttributes<HTMLDivElement>) {
    const fileUs = useAtomValue(fileUsAtom);
    const fceCtx = fileUs.fceAtoms?.viewFceCtx;
    if (!fceCtx) {
        return <div className="">12345</div>;
    }
    return (
        <div className={classNames("h-full w-full", className)} {...rest}>
            {/* <FldCatItemsGrid fceCtx={fceCtx} /> */}
            {/* <DialogFieldCatalogBody fceCtx={fceCtx} /> */}
            {/* <BodyWoButtons fceCtx={fceCtx} /> */}

            <div className="h-full flex">
                <FldCatItemsGrid className="max-w-lg" fceCtx={fceCtx} />
                {/* <RightPanelGuard className="1relative bg-blue-300/10 px-2 py-2 border-border border-l 1z-10" fceCtx={fceCtx} /> */}
                <div className="p-2  min-w-40">
                    <SelectedItemBody fceCtx={fceCtx} />
                </div>
            </div>

        </div>
    );
}
