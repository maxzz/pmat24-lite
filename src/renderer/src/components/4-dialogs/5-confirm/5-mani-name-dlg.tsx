import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useKey } from "react-use";
import { Dialog, DialogDescription, DialogFooter, Button } from "@/ui/shadcn";
import { InputWithTitle2Rows } from "@/ui/local-ui";
import { type ManiNameDlgData, maniNameDlgDataAtom, maniNameDlgCloseAtom } from "@/store/0-serve-atoms";
import { DialogContentWithHeader } from "./8-dialog-content-w-header";

export function ManiNameDialog() {
    const maniNameDlgClose = useSetAtom(maniNameDlgCloseAtom);

    const dlgData = useAtomValue(maniNameDlgDataAtom);
    if (!dlgData) {
        return null;
    }

    return (
        <Dialog open={!!dlgData} onOpenChange={() => maniNameDlgClose(false)}>
            <DialogContentWithHeader title="Managed login name" className={contentClasses} onDlgClose={maniNameDlgClose} modal>
                <DialogBody dlgData={dlgData} onCloseDlg={maniNameDlgClose} />
            </DialogContentWithHeader>
        </Dialog>
    );
}

const contentClasses = "p-0 w-72! rounded-lg max-w-sm gap-0 data-[state=open]:duration-ani-200";

function DialogBody({ dlgData, onCloseDlg }: { dlgData: ManiNameDlgData; onCloseDlg: (ok: boolean) => void; }) {
    const { nameAtom } = dlgData;
    const [{ data: name }, setNameData] = useAtom(nameAtom);

    useKey('Enter',
        () => {
            const active = document.activeElement as HTMLInputElement;
            const isValid = active?.matches('textarea') && active.ariaInvalid !== 'true';
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

            <InputWithTitle2Rows label="Managed login name" stateAtom={nameAtom} asTextarea />

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
