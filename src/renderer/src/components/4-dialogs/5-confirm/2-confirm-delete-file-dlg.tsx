import { useAtom, useAtomValue } from 'jotai';
import { Dialog, DialogContent, DialogDescription, DialogClose, DialogFooter, DialogHeader, DialogCloseButton } from '@/ui/shadcn/dialog';
import { Button } from '@/ui/shadcn/button';
import { type ConfirmatiionData, type ConfirmatiionMessages as ConfirmationMessages, doOpenConfirmDialogAtom, fileUsOfRightPanelAtom, rightPanelAtomAtom } from '@/store';

export const confirmDeleteMessages: ConfirmationMessages = {
    title: 'Delete file?',
    message: 'Are you sure you want to delete the manifest file?',
};

export function ConfirmDeleteFileDialog() {

    const [confirmDialogOpen, doOpenConfirmDeleteDialog] = useAtom(doOpenConfirmDialogAtom);
    if (!confirmDialogOpen) {
        return null;
    }

    function onDlgClose(ok: boolean) {
        if (!confirmDialogOpen) {
            throw new Error('no.in.data');
        }
        doOpenConfirmDeleteDialog(undefined);
        confirmDialogOpen.resolve(ok);
    }

    return (
        <Dialog open={!!confirmDialogOpen} onOpenChange={() => onDlgClose(false)}>
            <DialogContent
                className={contentClasses}
                hiddenTitle="Delete file?"
                noClose
            >
                <DialogHeader className="relative pl-4 pr-2 py-2 text-sm font-bold border-border border-b flex flex-row items-center justify-between space-y-0">
                    <div>
                        Delete file?
                    </div>
                    <DialogCloseButton className="!relative !right-0 !top-0 p-2 hover:text-white hover:bg-red-500 hover:opacity-100" tabIndex={-1} onClick={() => onDlgClose(false)} />
                </DialogHeader>

                <DialogBody confirmDialogOpen={confirmDialogOpen} onDlgClose={onDlgClose} />

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
                Are you sure you want to delete the manifest file?
            </DialogDescription>

            <DialogFooter className="py-4">
                <DialogClose asChild>
                    <Button variant="outline" onClick={() => onDlgClose(true)}>
                        Delete
                    </Button>
                </DialogClose>

                <DialogClose asChild>
                    <Button variant="default" onClick={() => onDlgClose(false)}>
                        Cancel
                    </Button>
                </DialogClose>

            </DialogFooter>
        </div>
    );
}
