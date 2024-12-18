import { useAtomValue, useSetAtom } from "jotai";
import { doCancelFceDlgAtom, doCloseFceDlgAtom, type FceCtx } from "@/store";
import { Button } from "@/ui/shadcn";
import { inputFocusClasses } from "../3-selected-item-props/8-inputs";

type BottomButtonsProps = {
    fceCtx: FceCtx;
};

export function BottomButtons({ fceCtx }: BottomButtonsProps) {

    const closeFldCatDialog = useSetAtom(doCloseFceDlgAtom);
    const doCancelFldCatDialog = useSetAtom(doCancelFceDlgAtom);

    const selectedItem = useAtomValue(fceCtx.selectedItemAtom);
    const showSelectBtn = !!fceCtx.inData?.outBoxAtom;

    return (<>
        {showSelectBtn && (
            <Button className={inputFocusClasses} disabled={!selectedItem} onClick={() => closeFldCatDialog({ selectedItem })}>
                Select
            </Button>
        )}

        <Button className={inputFocusClasses} onClick={doCancelFldCatDialog}>
            {showSelectBtn ? 'Cancel' : 'Close'}
        </Button>
    </>);
}
