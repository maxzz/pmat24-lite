import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useKey } from 'react-use';
import { Dialog, DialogDescription, DialogFooter, Button } from '@/ui/shadcn';
import { InFormRowInputWTitle } from '@/components/2-main/2-right/2-file-mani/2-form-options';
import { type ManiNameDlgData, maniNameDlgDataAtom, maniNameDlgCloseAtom } from '@/store';
import { DialogTitleHeader } from './3-dialog-title-header';

export function ManiNameDialog() {
    const maniNameDlgClose = useSetAtom(maniNameDlgCloseAtom);

    const dlgData = useAtomValue(maniNameDlgDataAtom);
    if (!dlgData) {
        return null;
    }

    return (
        <Dialog open={!!dlgData} onOpenChange={() => maniNameDlgClose(false)}>
            <DialogTitleHeader title="Managed login name" className={contentClasses} onDlgClose={maniNameDlgClose}>
                <DialogBody dlgData={dlgData} onCloseDlg={maniNameDlgClose} />
            </DialogTitleHeader>
        </Dialog>
    );
}

const contentClasses = "p-0 !w-72 rounded-lg max-w-sm gap-0 data-[state=open]:[animation-duration:200ms]";

function DialogBody({ dlgData, onCloseDlg }: { dlgData: ManiNameDlgData; onCloseDlg: (ok: boolean) => void; }) {
    const { nameAtom } = dlgData;
    const [{ data: name, error }, setNameData] = useAtom(nameAtom);

    useKey('Enter', () => {
        const active = document.activeElement as HTMLInputElement;
        const isValid = active?.matches('input') && active.ariaInvalid !== 'true';
        if (isValid) {
            onCloseDlg(true);
        } else {
            setNameData((v) => ({ ...v, touched: true }));
        }
    });

    return (
        <div className="px-4">
            <DialogDescription className="pt-4 pb-2 text-xs text-foreground">
                Please provide a name for the manifest. This name will be used in the list of manifests in the left pane.
            </DialogDescription>

            <InFormRowInputWTitle label="Managed login name" stateAtom={nameAtom} />

            <DialogFooter className="py-4 flex-row justify-end gap-2">
                <Button className="min-w-14" variant="default" disabled={!name} onClick={() => onCloseDlg(true)}>
                    OK
                </Button>

                <Button variant="outline" onClick={() => onCloseDlg(false)}>
                    Cancel
                </Button>
            </DialogFooter>
        </div>
    );
}
