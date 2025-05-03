import { useAtom, useAtomValue } from 'jotai';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogCloseButton } from '@/ui/shadcn/dialog';
import { Button } from '@/ui/shadcn/button';
import { doOpenManiNameDialogAtom, type ManiNameData } from '@/store';
import { InputWTooltip } from '@/components/2-main/2-right/2-file-mani/2-form-options/9-controls';

export function ManiNameDialog() {
    const [openManiNameDialog, doOpenManiNameDialog] = useAtom(doOpenManiNameDialogAtom);
    if (!openManiNameDialog) {
        return null;
    }

    function onDlgClose(ok: boolean) {
        if (!openManiNameDialog) {
            throw new Error('no.in.data');
        }
        doOpenManiNameDialog(undefined);
        openManiNameDialog.resolve(ok);
    }

    return (
        <Dialog open={!!openManiNameDialog} onOpenChange={() => onDlgClose(false)}>
            <DialogContent className={contentClasses} hiddenTitle="New manifest name" noClose>
                <DialogHeader className="relative pl-4 pr-2 py-2 text-sm font-bold border-border border-b flex flex-row items-center justify-between space-y-0">
                    <div>
                        New manifest name
                    </div>
                    <DialogCloseButton className="!relative !right-0 !top-0 p-2 hover:text-white hover:bg-red-500 hover:opacity-100" tabIndex={-1} onClick={() => onDlgClose(false)} />
                </DialogHeader>

                <DialogBody maniNameData={openManiNameDialog} onDlgClose={onDlgClose} />

            </DialogContent>
        </Dialog>
    );
}

const contentClasses = "p-0 max-w-sm gap-0 data-[state=open]:[animation-duration:200ms]";

function DialogBody({ maniNameData, onDlgClose }: { maniNameData: ManiNameData; onDlgClose: (ok: boolean) => void; }) {

    const { nameAtom } = maniNameData;
    const { data: name } = useAtomValue(nameAtom);

    return (
        <div className="px-4">
            <DialogDescription className="pt-4 pb-2 text-xs text-foreground">
                Please provide a name for the manifest. This name will be used in the list of manifests in the left pane.
            </DialogDescription>

            <div className="pb-3 text-xs">
                Manifest name
                <InputWTooltip stateAtom={nameAtom} />
            </div>

            <DialogFooter className="py-4">
                <Button className="min-w-14" variant="default" disabled={!name} onClick={() => onDlgClose(true)}>
                    OK
                </Button>

                <Button variant="outline" onClick={() => onDlgClose(false)}>
                    Cancel
                </Button>
            </DialogFooter>
        </div>
    );
}
