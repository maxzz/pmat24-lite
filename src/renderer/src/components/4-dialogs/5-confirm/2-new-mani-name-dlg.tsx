import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Dialog, DialogContent, DialogDescription, DialogClose, DialogFooter, DialogHeader, DialogCloseButton } from '@/ui/shadcn/dialog';
import { Button } from '@/ui/shadcn/button';
import { doOpenManiNameDialogAtom, fileUsOfRightPanelAtom, rightPanelAtom } from '@/store';

export function ManiNameDialog() {

    const [openManiNameDialog, doOpenManiNameDialog] = useAtom(doOpenManiNameDialogAtom);
    if (!openManiNameDialog) {
        return null;
    }

    return (
        <Dialog open={openManiNameDialog} onOpenChange={() => doOpenManiNameDialog(false)}>
            <DialogContent
                className={contentClasses}
                hiddenTitle="Delete file?"
                noClose
            >
                <DialogHeader className="relative pl-4 pr-2 py-2 text-sm font-bold border-border border-b flex flex-row items-center justify-between space-y-0">
                    <div>
                        New manifest name
                    </div>
                    <DialogCloseButton className="!relative !right-0 !top-0 p-2 hover:text-white hover:bg-red-500 hover:opacity-100" tabIndex={-1} onClick={() => doOpenManiNameDialog(false)} />
                </DialogHeader>

                <DialogBody />

            </DialogContent>
        </Dialog>
    );
}

const contentClasses = "p-0 max-w-sm data-[state=open]:[animation-duration:200ms]";

function DialogBody() {

    const rightPanel = useAtomValue(rightPanelAtom);
    const fileUs = useAtomValue(fileUsOfRightPanelAtom);
    if (!fileUs || !rightPanel) {
        return null;
    }

    return (
        <div className="px-4">
            <DialogDescription className="pt-2 pb-2">
                
            </DialogDescription>

            <DialogFooter className="py-4">
                <DialogClose asChild>
                    {/* <Button variant="outline"> */}
                    <Button variant="outline" onClick={() => {}}>
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
