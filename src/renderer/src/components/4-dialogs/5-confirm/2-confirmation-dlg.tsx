import { useAtom } from 'jotai';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogCloseButton } from '@/ui/shadcn/dialog';
import { Button } from '@/ui/shadcn/button';
import { type ConfirmationData, doOpenConfirmDialogAtom } from '@/store';

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
                overlayClasses="bg-background/10 backdrop-blur-[1px]"
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

const contentClasses = "p-0 w-72 max-w-sm data-[state=open]:[animation-duration:200ms]";

function DialogBody({ confirmDialogOpen, onDlgClose }: { confirmDialogOpen: ConfirmationData; onDlgClose: (ok: boolean) => void; }) {
    const { ui: { message, buttonOk, buttonCancel, isDafaultOk }, resolve } = confirmDialogOpen;
    return (
        <div className="px-4">
            <DialogDescription className="pt-1 pb-1 text-xs">
                {message}
            </DialogDescription>

            <DialogFooter className="py-4">
                <Button variant={isDafaultOk ? 'default' : 'outline'} onClick={() => onDlgClose(true)}>
                    {buttonOk}
                </Button>

                <Button variant={isDafaultOk ? 'outline' : 'default'} onClick={() => onDlgClose(false)}>
                    {buttonCancel}
                </Button>
            </DialogFooter>
        </div>
    );
}

function DialogContentWrapper({ title, className, children, onDlgClose }: { title: string; className: string; children: React.ReactNode; onDlgClose: (ok: boolean) => void; }) {
    return (
        <DialogContent
            className={className}
            overlayClasses="bg-background/10 backdrop-blur-[1px]"
            hiddenTitle={title}
            noClose
        >
            <DialogHeader className="relative pl-4 pr-2 py-2 text-sm font-bold border-border border-b flex flex-row items-center justify-between space-y-0">
                <div>
                    {title}
                </div>
                <DialogCloseButton className="!relative !right-0 !top-0 p-2 hover:text-white hover:bg-red-500 hover:opacity-100" tabIndex={-1} onClick={() => onDlgClose(false)} />
            </DialogHeader>

            {children}

        </DialogContent>
    );
}
