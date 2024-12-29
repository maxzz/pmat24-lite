import { useAtomValue, useSetAtom } from "jotai";
import { doCancelFceDlgAtom, doCloseFceDlgAtom, type FceCtx } from "@/store";
import { Button } from "@/ui/shadcn";
import { inputFocusClasses } from "../4-selected-item-props/8-inputs";

export function BottomButtons({ fceCtx }: { fceCtx: FceCtx; }) {
    const doCancelFldCatDialog = useSetAtom(doCancelFceDlgAtom);

    const openMainDlg = !fceCtx.inData?.openItemPickerDlg; //TODO: implement logic
    const showSelectBtn = !openMainDlg;

    return (<>
        {showSelectBtn && (
            <ButtonSelect fceCtx={fceCtx} />
        )}

        <Button className={inputFocusClasses} onClick={doCancelFldCatDialog}>
            {showSelectBtn ? 'Cancel' : 'Close'}
        </Button>
    </>);
}

function ButtonSelect({ fceCtx }: { fceCtx: FceCtx; }) {
    const selectedItem = useAtomValue(fceCtx.selectedItemAtom);
    const closeFldCatDialog = useSetAtom(doCloseFceDlgAtom);
    return (
        <Button className={inputFocusClasses} disabled={!selectedItem} onClick={() => closeFldCatDialog({ selectedItem })}>
            Select
        </Button>
    );
}
