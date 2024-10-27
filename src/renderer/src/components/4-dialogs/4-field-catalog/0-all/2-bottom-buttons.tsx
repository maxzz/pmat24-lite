import { useAtomValue, useSetAtom } from "jotai";
import { doCancelFldCatDialogAtom, doCloseFldCatDialogAtom, fldCatTriggerAtom, type SelectedItemAtom } from "@/store";
import { Button } from "@/ui/shadcn";
import { inputFocusClasses } from "../3-selected-item-props/8-inputs";
import { type FceCtx } from "./9-types";

type BottomButtonsProps = {
    ctx: FceCtx;
    selectedItemAtom: SelectedItemAtom;
};

export function BottomButtons({ ctx, selectedItemAtom }: BottomButtonsProps) {

    const closeFldCatDialog = useSetAtom(doCloseFldCatDialogAtom);
    const doCancelFldCatDialog = useSetAtom(doCancelFldCatDialogAtom);

    const selectedItem = useAtomValue(selectedItemAtom);

    const inData = useAtomValue(fldCatTriggerAtom);
    const showSelectBtn = !!inData?.outBoxAtom;

    return (<>
        {showSelectBtn && (
            <Button className={inputFocusClasses} onClick={() => closeFldCatDialog({ fldCatItem: selectedItem })} disabled={!selectedItem}>
                Select
            </Button>
        )}

        <Button className={inputFocusClasses} onClick={doCancelFldCatDialog}>
            {showSelectBtn ? 'Cancel' : 'Close'}
        </Button>
    </>);
}

//ToDO: use inputFocusClasses from one location
