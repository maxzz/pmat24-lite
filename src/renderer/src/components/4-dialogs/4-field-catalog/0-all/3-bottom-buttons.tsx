import { ButtonHTMLAttributes } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { doCancelFldCatDialogAtom, doCloseFldCatDialogAtom, fldCatTriggerAtom, type SelectedItemAtom } from "@/store";
import { Button } from "@/ui/shadcn";
import { inputFocusClasses } from "../2-selected-item-props/8-inputs";

type BottomButtonsProps = {
    selectedItemAtom: SelectedItemAtom;
};

export function BottomButtons({ selectedItemAtom }: BottomButtonsProps) {
    const inData = useAtomValue(fldCatTriggerAtom);
    const showSelectBtn = !!inData?.outBoxAtom;

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

//ToDO: use inputFocusClasses from one location
