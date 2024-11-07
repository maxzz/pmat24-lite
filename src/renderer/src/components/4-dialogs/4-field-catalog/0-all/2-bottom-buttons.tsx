import { useAtomValue, useSetAtom } from "jotai";
import { doCancelFldCatDialogAtom, doCloseFldCatDialogAtom, type FceCtx } from "@/store";
import { Button } from "@/ui/shadcn";
import { inputFocusClasses } from "../3-selected-item-props/8-inputs";

type BottomButtonsProps = {
    fceCtx: FceCtx;
};

export function BottomButtons({ fceCtx }: BottomButtonsProps) {

    const closeFldCatDialog = useSetAtom(doCloseFldCatDialogAtom);
    const doCancelFldCatDialog = useSetAtom(doCancelFldCatDialogAtom);

    const selectedItem = useAtomValue(fceCtx.selectedItemAtom);

    const showSelectBtn = !!fceCtx.inData?.outBoxAtom;

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