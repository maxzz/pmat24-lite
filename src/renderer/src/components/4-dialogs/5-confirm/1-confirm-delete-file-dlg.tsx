import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogFooter, DialogHeader } from '@/ui/shadcn/dialog';
import { Button } from '@/ui/shadcn/button';
import { doDeleteFileUsAtom, doOpenConfirmDeleteDialogAtom, fileUsOfRightPanelAtom, rightPanelAtom } from '@/store';

export function ConfirmDeleteFileDialog() {
    const [confirmDialogOpen, doOpenConfirmDeleteDialog] = useAtom(doOpenConfirmDeleteDialogAtom);
    if (!confirmDialogOpen) {
        return null;
    }

    return (
        <Dialog open={confirmDialogOpen} onOpenChange={() => doOpenConfirmDeleteDialog(false)}>
            <DialogContent
                className={contentClasses}
                hiddenTitle='Delete file?'
            >
                <DialogHeader className="relative text-base font-bold border-border border-b flex items-start">
                    <div className="py-2">Delete file?</div>
                    <Button className="right-1 -top-0.5 p-2 hover:bg-muted hover:rounded-md" tabIndex={-1} onClick={() => doOpenConfirmDeleteDialog(false)} />
                </DialogHeader>

                <DialogTitle>Delete file?</DialogTitle>
                <DialogBody />

            </DialogContent>
        </Dialog>
    );
}

const contentClasses = "px-4 data-[state=open]:[animation-duration:200ms]";

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
