// create the delete file confirmation react dialog using shadcn/dialog. Dialog should have two buttons: Delete and Cancel.
// When user clicks Delete, delete the file and close the dialog.
// When user clicks Cancel, close the dialog.

import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogFooter, DialogTrigger } from '@/ui/shadcn/dialog';
import { Button } from '@/ui/shadcn/button';
import { useAtomValue, useSetAtom } from 'jotai';
import { rightPanelAtom } from '@/store';
// import { doDeleteFileUsAtom } from '@/store/1-atoms/2-file-mani-atoms';

export function ConfirmDeleteFileDialog() {
    const fileUsAtom = useAtomValue(rightPanelAtom);
    // const doDeleteFileUs = useSetAtom(doDeleteFileUsAtom);

    return (
        <Dialog>
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
            </DialogContent>

            <DialogFooter>
                <DialogClose asChild>
                    <Button color="red" variant="outline">
                        Cancel
                    </Button>
                </DialogClose>

                <DialogClose asChild>
                    <Button color="red" variant="default">
                        Delete
                    </Button>
                </DialogClose>
            </DialogFooter>
        </Dialog>
    );
}
