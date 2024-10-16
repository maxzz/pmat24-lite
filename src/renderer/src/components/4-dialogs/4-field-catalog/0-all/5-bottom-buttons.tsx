import { ButtonHTMLAttributes } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { doCancelFldCatDialogAtom, doCloseFldCatDialogAtom, type SelectedItemAtom } from "@/store";
import { Button } from "@/ui/shadcn";
import { inputFocusClasses } from "../2-selected-item-props/0-all";

type BottomButtonsProps = {
    selectedItemAtom: SelectedItemAtom;
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

function SelectButton({ selectedItemAtom, ...rest }: {selectedItemAtom: SelectedItemAtom}) {
    const closeFldCatDialog = useSetAtom(doCloseFldCatDialogAtom);
    const selectedItem = useAtomValue(selectedItemAtom);
    return (
        <Button disabled={!selectedItem} onClick={() => closeFldCatDialog({ fldCatItem: selectedItem })} {...rest}>
            Select
        </Button>
    );
}
