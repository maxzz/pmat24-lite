import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogFooter, DialogHeader, DialogCloseButton } from '@/ui/shadcn/dialog';
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
                hiddenTitle="Delete file?"
                noClose
            >
                <DialogHeader className="relative pl-4 pr-2 py-2 text-sm font-bold border-border border-b flex flex-row items-center justify-between space-y-0">
                    <div className="">Delete file?</div>
                    <DialogCloseButton className="!relative 1absolute !right-0 !top-0 1right-1.5 -1top-0.5 p-2 hover:text-white hover:bg-red-500 hover:opacity-100" tabIndex={-1} onClick={() => doOpenConfirmDeleteDialog(false)} />
                    {/* <Button className="relative! 1absolute right-0 top-0 1right-1.5 -1top-0.5 p-2 hover:text-white hover:bg-[#f00]" tabIndex={-1} onClick={() => doOpenConfirmDeleteDialog(false)} /> */}
                </DialogHeader>

                {/* <DialogTitle>Delete file?</DialogTitle> */}
                <DialogBody />

            </DialogContent>
        </Dialog>
    );
}

const contentClasses = "p-0 max-w-sm data-[state=open]:[animation-duration:200ms]";

function DialogBody() {

    // const doDeleteFileUs = useSetAtom(doDeleteFileUsAtom);
    // const rightPanel = useAtomValue(rightPanelAtom);
    // const fileUs = useAtomValue(fileUsOfRightPanelAtom);
    // if (!fileUs || !rightPanel) {
    //     return null;
    // }

    return (
        <div className="px-4">
            <DialogDescription className="pt-2 pb-2">
                Are you sure you want to delete the manifest file?
            </DialogDescription>

            <DialogFooter className="py-4">
                <DialogClose asChild>
                    <Button variant="outline">
                    {/* <Button variant="outline" onClick={() => doDeleteFileUs(rightPanel)}> */}
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
