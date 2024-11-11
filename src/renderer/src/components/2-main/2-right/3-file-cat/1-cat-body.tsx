import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { FldCatItemsGrid } from "@/components/4-dialogs/4-field-catalog/2-items-grid";
import { classNames } from "@/utils";
import { SelectedItemBody } from "@/components/4-dialogs/4-field-catalog/3-selected-item-props/1-body";

export function FcViewBody({ fileUsAtom, className, ...rest }: { fileUsAtom: FileUsAtom; } & HTMLAttributes<HTMLDivElement>) {
    const fileUs = useAtomValue(fileUsAtom);
    const fceCtx = fileUs.fceAtoms?.viewFceCtx;
    if (!fceCtx) {
        return <div className="">12345</div>;
    }
    return (
        <div className={classNames("h-full w-full flex", className)} {...rest}>

            <FldCatItemsGrid className="max-w-lg" fceCtx={fceCtx} />

            <div className="p-2 min-w-48 border-border border-l">
                <SelectedItemBody fceCtx={fceCtx} />
            </div>
        </div>
    );
}
