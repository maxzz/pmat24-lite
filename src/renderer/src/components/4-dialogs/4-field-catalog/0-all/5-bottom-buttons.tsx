import { useAtomValue, useSetAtom } from "jotai";
import { doCancelFceDlgAtom, doCloseFceDlgAtom, type FceCtx } from "@/store";
import { Button } from "@/ui/shadcn";
import { inputFocusClasses } from "../4-selected-item-props/8-inputs";

type BottomButtonsProps = {
    fceCtx: FceCtx;
};

export function BottomButtons({ fceCtx }: BottomButtonsProps) {
    const openMainDlg = !fceCtx.inData?.openSelectItemDlg; //TODO: implement logic
    const showSelectBtn = !openMainDlg;
    const doCancelFldCatDialog = useSetAtom(doCancelFceDlgAtom);

    return (<>
        {showSelectBtn && (
            <SelectBtn fceCtx={fceCtx} />
        )}

        <Button className={inputFocusClasses} onClick={doCancelFldCatDialog}>
            {showSelectBtn ? 'Cancel' : 'Close'}
        </Button>
    </>);
}

function SelectBtn({ fceCtx }: { fceCtx: FceCtx; }) {
    const selectedItem = useAtomValue(fceCtx.selectedItemAtom);
    const closeFldCatDialog = useSetAtom(doCloseFceDlgAtom);
    return (
        <Button className={inputFocusClasses} disabled={!selectedItem} onClick={() => closeFldCatDialog({ selectedItem })}>
            Select
        </Button>
    );
}
