import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogFooter, DialogTrigger } from '@/ui/shadcn/dialog';
import { Button } from '@/ui/shadcn/button';
import { doOpenConfirmDeleteDialogAtom, rightPanelAtom } from '@/store';
// import { doDeleteFileUsAtom } from '@/store/1-atoms/2-file-mani-atoms';

export function ConfirmDeleteFileDialog() {
    const fileUsAtom = useAtomValue(rightPanelAtom);
    // const doDeleteFileUs = useSetAtom(doDeleteFileUsAtom);

    const [confirmDialogOpen, doOpenConfirmDeleteDialog] = useAtom(doOpenConfirmDeleteDialogAtom);
    if (!confirmDialogOpen) {
        return null;
    }

    return (
        <Dialog open={confirmDialogOpen} onOpenChange={() => doOpenConfirmDeleteDialog(false)}>
            <DialogTrigger asChild>
                <Button variant="outline" color="red" className="w-full">
                    Delete
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle>Delete file?</DialogTitle>

                <DialogDescription>
                    Are you sure you want to delete the file?
                </DialogDescription>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button color="red" variant="outline">
                            Delete
                        </Button>
                    </DialogClose>

                    <DialogClose asChild>
                        <Button color="red" variant="default">
                            Cancel
                        </Button>
                    </DialogClose>

                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
