import { useAtom, useAtomValue } from 'jotai';
import { Dialog, DialogContent, DialogDescription, DialogClose, DialogFooter, DialogHeader, DialogCloseButton } from '@/ui/shadcn/dialog';
import { Button } from '@/ui/shadcn/button';
import { type ConfirmatiionData, type ConfirmatiionMessages as ConfirmationMessages, doOpenConfirmDialogAtom, fileUsOfRightPanelAtom, rightPanelAtomAtom } from '@/store';

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
            <DialogContent
                className={contentClasses}
                hiddenTitle={confirmData.ui.title}
                noClose
            >
                <DialogHeader className="relative pl-4 pr-2 py-2 text-sm font-bold border-border border-b flex flex-row items-center justify-between space-y-0">
                    <div>
                        {confirmData.ui.title}
                    </div>
                    <DialogCloseButton className="!relative !right-0 !top-0 p-2 hover:text-white hover:bg-red-500 hover:opacity-100" tabIndex={-1} onClick={() => onDlgClose(false)} />
                </DialogHeader>

                <DialogBody confirmDialogOpen={confirmData} onDlgClose={onDlgClose} />

            </DialogContent>
        </Dialog>
    );
}

const contentClasses = "p-0 max-w-sm data-[state=open]:[animation-duration:200ms]";

function DialogBody({ confirmDialogOpen, onDlgClose }: { confirmDialogOpen: ConfirmatiionData; onDlgClose: (ok: boolean) => void; }) {

    const rightPanelAtom = useAtomValue(rightPanelAtomAtom);
    const fileUs = useAtomValue(fileUsOfRightPanelAtom);
    if (!fileUs || !rightPanelAtom) {
        return null;
    }

    return (
        <div className="px-4">
            <DialogDescription className="pt-2 pb-2">
                {confirmDialogOpen.ui.message}
            </DialogDescription>

            <DialogFooter className="py-4">
                <DialogClose asChild>
                    <Button variant="outline" onClick={() => onDlgClose(true)}>
                        {confirmDialogOpen.ui.buttonOk}
                    </Button>
                </DialogClose>

                <DialogClose asChild>
                    <Button variant="default" onClick={() => onDlgClose(false)}>
                        {confirmDialogOpen.ui.buttonCancel}
                    </Button>
                </DialogClose>

            </DialogFooter>
        </div>
    );
}

//TODO: confirmation dialog: default button is the first one. This is not good UX

export const confirmDeleteMessages: ConfirmationMessages = {
    title: 'Delete file?',
    message: 'Are you sure you want to delete the manifest file?',
    buttonOk: 'Delete',
    buttonCancel: 'Cancel',
};
