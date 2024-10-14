import { PrimitiveAtom } from "jotai";
import { CatalogItem } from "@/store/manifest";
import { BottomButton } from "@/components/2-main/2-right/2-file-manifest/3-tab-policy/dlg-policy-editor/3-sections";
import { inputFocusClasses } from "./4-selected-item-body";
import { SelectButton } from "./6-select-button";

type BottomButtonsProps = {
    selectedItemAtom: PrimitiveAtom<CatalogItem | null>;
    needSelect: boolean;
};

export function BottomButtons({ selectedItemAtom, needSelect }: BottomButtonsProps) {
    return (
        <div className="pt-4 flex items-center justify-end gap-x-2">
            {needSelect
                ? (<>
                    <SelectButton selectedItemAtom={selectedItemAtom} />
                    <BottomButton className={inputFocusClasses}>Cancel</BottomButton>
                </>)
                : (
                    <BottomButton>Close</BottomButton>
                )
            }
        </div>
    );
}
