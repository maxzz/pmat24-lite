import { PrimitiveAtom, useSetAtom } from "jotai";
import { CatalogItem } from "@/store/manifest";
import { doCancelFldCatDialogAtom } from "@/store";
import { Button } from "@/ui/shadcn";
import { SelectButton } from "./6-select-button";
import { inputFocusClasses } from "./4-selected-item-body";

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
