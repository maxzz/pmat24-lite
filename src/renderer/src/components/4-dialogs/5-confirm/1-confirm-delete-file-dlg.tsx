import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogFooter } from '@/ui/shadcn/dialog';
import { Button } from '@/ui/shadcn/button';
import { doDeleteFileUsAtom, doOpenConfirmDeleteDialogAtom, fileUsOfRightPanelAtom, rightPanelAtom } from '@/store';

export function ConfirmDeleteFileDialog() {
    const [confirmDialogOpen, doOpenConfirmDeleteDialog] = useAtom(doOpenConfirmDeleteDialogAtom);
    if (!confirmDialogOpen) {
        return null;
    }

    return (
        <Dialog open={confirmDialogOpen} onOpenChange={() => doOpenConfirmDeleteDialog(false)}>
            <DialogContent>
                <DialogTitle>Delete file?</DialogTitle>
                <DialogBody />

            </DialogContent>
        </Dialog>
    );
}

function DialogBody() {
    const rightPanel = useAtomValue(rightPanelAtom);

    const fileUs = useAtomValue(fileUsOfRightPanelAtom);
    if (!fileUs || !rightPanel) {
        return null;
    }

    const doDeleteFileUs = useSetAtom(doDeleteFileUsAtom);

    return (
        <div className="">
            <DialogDescription>
                Are you sure you want to delete the manifest file?
            </DialogDescription>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline" onClick={() => doDeleteFileUs(rightPanel)}>
                        Delete
                    </Button>
                </DialogClose>

                <DialogClose asChild>
                    <Button variant="default">
                        Cancel
                    </Button>
                </DialogClose>

            </DialogFooter>
        </div>
    );
}
