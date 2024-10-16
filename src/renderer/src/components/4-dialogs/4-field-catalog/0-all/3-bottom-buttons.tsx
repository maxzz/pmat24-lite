import { useAtomValue, useSetAtom } from "jotai";
import { doCancelFldCatDialogAtom, doCloseFldCatDialogAtom, fldCatTriggerAtom, type SelectedItemAtom } from "@/store";
import { Button } from "@/ui/shadcn";
import { inputFocusClasses } from "../2-selected-item-props/8-inputs";

export function BottomButtons({ selectedItemAtom }: { selectedItemAtom: SelectedItemAtom; }) {

    const inData = useAtomValue(fldCatTriggerAtom);
    const showSelectBtn = !!inData?.outBoxAtom;

    const selectedItem = useAtomValue(selectedItemAtom);

    const closeFldCatDialog = useSetAtom(doCloseFldCatDialogAtom);
    const doCancelFldCatDialog = useSetAtom(doCancelFldCatDialogAtom);

    return (
        <div className="pt-4 flex items-center justify-end gap-x-2">
            {showSelectBtn && (
                <Button disabled={!selectedItem} onClick={() => closeFldCatDialog({ fldCatItem: selectedItem })}>
                    Select
                </Button>
            )}

            <Button className={inputFocusClasses} onClick={doCancelFldCatDialog}>
                {showSelectBtn ? 'Cancel' : 'Close'}
            </Button>
        </div>
    );
}

//ToDO: use inputFocusClasses from one location
