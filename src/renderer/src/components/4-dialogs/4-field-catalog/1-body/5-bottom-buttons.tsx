import { PrimitiveAtom } from "jotai";
import { CatalogItem } from "@/store/manifest";
import { inputFocusClasses } from "./4-selected-item-body";
import { SelectButton } from "./6-select-button";
import { Button } from "@/ui/shadcn";

type BottomButtonsProps = {
    selectedItemAtom: PrimitiveAtom<CatalogItem | null>;
    showSelectBtn: boolean;
};

export function BottomButtons({ selectedItemAtom, showSelectBtn }: BottomButtonsProps) {
    return (
        <div className="pt-4 flex items-center justify-end gap-x-2">
            {showSelectBtn && (
                <SelectButton selectedItemAtom={selectedItemAtom} />
            )}

            <Button className={inputFocusClasses}>
                {showSelectBtn ? 'Cancel' : 'Close'}
            </Button>
        </div>
    );
}
