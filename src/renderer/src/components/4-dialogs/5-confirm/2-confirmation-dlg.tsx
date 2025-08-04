import { useAtom } from "jotai";
import { Button, Dialog, DialogDescription, DialogFooter } from "@/ui/shadcn";
import { type ConfirmationData, doOpenConfirmDialogAtom } from "@/store";
import { DialogTitleHeader } from "./3-dialog-title-header";
import { classNames } from "@/utils";

export function ConfirmDeleteFileDialog() {
    const [confirmData, doCloseDialog] = useAtom(doOpenConfirmDialogAtom);
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
            <DialogTitleHeader title={confirmData.ui.title} className={contentClasses} onDlgClose={onDlgClose}>
                <DialogBody
                    confirmDialogOpen={confirmData}
                    onDlgClose={onDlgClose}
                />
            </DialogTitleHeader>
        </Dialog>
    );
}

const contentClasses = "p-0 !w-72 rounded-lg max-w-sm data-[state=open]:[animation-duration:200ms]";

function DialogBody({ confirmDialogOpen, onDlgClose }: { confirmDialogOpen: ConfirmationData; onDlgClose: (ok: boolean) => void; }) {
    const { ui: { icon, message, buttonOk, buttonCancel, isDafaultOk }, } = confirmDialogOpen;

    return (
        <div className="px-4">
            <div className="pt-1 pb-1 text-xs flex items-center gap-x-2">
                {icon}
                {message}
            </div>

            <DialogFooter className={classNames("py-4 flex-row gap-2", buttonCancel ? "justify-end" : "!justify-center")}>
                <Button variant={isDafaultOk ? 'default' : 'outline'} onClick={() => onDlgClose(true)}>
                    {buttonOk}
                </Button>

                {buttonCancel && (
                    <Button variant={isDafaultOk ? 'outline' : 'default'} onClick={() => onDlgClose(false)}>
                        {buttonCancel}
                    </Button>
                )}
            </DialogFooter>
        </div>
    );
}
