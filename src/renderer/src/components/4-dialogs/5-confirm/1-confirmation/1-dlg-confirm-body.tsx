import { useAtom } from "jotai";
import { classNames } from "@/utils";
import { Button, Dialog, DialogFooter } from "@/ui/shadcn";
import { type ConfirmationData, isOpenConfirmDialogAtom } from "./a-dlg-confirm-atoms";
import { DialogContentWithHeader } from "@/ui/local-ui";

export function ConfirmationDialog() {
    const [confirmData, doCloseDialog] = useAtom(isOpenConfirmDialogAtom);
    if (!confirmData) {
        return null;
    }

    function onDlgClose(ok: boolean) {
        if (!confirmData) {
            throw new Error('no.in.data');
        }
        doCloseDialog(undefined);
        confirmData.resolve(ok);
    }

    return (
        <Dialog open={!!confirmData} onOpenChange={() => onDlgClose(false)}>
            <DialogContentWithHeader title={confirmData.ui.title} className={classNames(contentClasses, confirmData.ui.contentClasses)} onDlgClose={onDlgClose} modal>
                <Body
                    confirmData={confirmData}
                    onDlgClose={onDlgClose}
                />
            </DialogContentWithHeader>
        </Dialog>
    );
}

const contentClasses = "p-0 w-72! max-w-sm rounded-lg data-[state=open]:duration-ani-200";

function Body({ confirmData, onDlgClose }: { confirmData: ConfirmationData; onDlgClose: (ok: boolean) => void; }) {
    const { ui: { icon, message, buttonOk, buttonCancel, isDafaultOk } } = confirmData;

    return (
        <div className="px-4">
            <div className="pt-1 pb-1 text-xs flex items-center gap-x-2">
                {icon}
                {message}
            </div>

            <DialogFooter className={classNames("py-4 flex-row space-x-0", buttonCancel ? "justify-end" : "justify-center!")}>
                <Button variant={isDafaultOk ? 'default' : 'outline'} className="min-w-14" onClick={() => onDlgClose(true)}>
                    {buttonOk}
                </Button>

                {buttonCancel && (
                    <Button variant={isDafaultOk ? 'outline' : 'default'} className="min-w-14" onClick={() => onDlgClose(false)}>
                        {buttonCancel}
                    </Button>
                )}
            </DialogFooter>
        </div>
    );
}
