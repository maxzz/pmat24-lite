import { PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { CatalogItem } from "@/store/manifest";
import { doCancelFldCatDialogAtom, doCloseFldCatDialogAtom } from "@/store";
import { Button } from "@/ui/shadcn";
import { inputFocusClasses } from "./4-selected-item-body";
import { ButtonHTMLAttributes } from "react";

type BottomButtonsProps = {
    selectedItemAtom: PrimitiveAtom<CatalogItem | null>;
    showSelectBtn: boolean;
};

export function BottomButtons({ selectedItemAtom, showSelectBtn }: BottomButtonsProps) {
    const doCancelFldCatDialog = useSetAtom(doCancelFldCatDialogAtom);
    return (
        <div className="pt-4 flex items-center justify-end gap-x-2">
            {showSelectBtn && (
                <SelectButton selectedItemAtom={selectedItemAtom} />
            )}

            <Button className={inputFocusClasses} onClick={doCancelFldCatDialog}>
                {showSelectBtn ? 'Cancel' : 'Close'}
            </Button>
        </div>
    );
}

type SelectButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    selectedItemAtom: PrimitiveAtom<CatalogItem | null>;
};

function SelectButton({ selectedItemAtom, ...rest }: SelectButtonProps) {
    const closeFldCatDialog = useSetAtom(doCloseFldCatDialogAtom);
    const selectedItem = useAtomValue(selectedItemAtom);
    return (
        <Button disabled={!selectedItem} onClick={() => closeFldCatDialog({ fldCatItem: selectedItem })} {...rest}>
            Select
        </Button>
    );
}
