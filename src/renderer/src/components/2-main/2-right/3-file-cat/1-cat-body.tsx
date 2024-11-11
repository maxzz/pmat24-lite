import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { FldCatItemsGrid } from "@/components/4-dialogs/4-field-catalog/2-items-grid";
import { classNames } from "@/utils";
import { BodyWoButtons, DialogFieldCatalogBody } from "@/components/4-dialogs/4-field-catalog/0-all/1-dialog-body";

export function FcViewBody({ fileUsAtom, className, ...rest }: { fileUsAtom: FileUsAtom; } & HTMLAttributes<HTMLDivElement>) {
    const fileUs = useAtomValue(fileUsAtom);
    const fceCtx = fileUs.fceAtoms?.viewFceCtx;
    if (!fceCtx) {
        return <div className="">12345</div>
    }
    return (
        <div className={classNames("h-full w-full", className)} {...rest}>
            {/* <FldCatItemsGrid fceCtx={fceCtx} /> */}
            {/* <DialogFieldCatalogBody fceCtx={fceCtx} /> */}
            <BodyWoButtons fceCtx={fceCtx} />
        </div>
    );
}
