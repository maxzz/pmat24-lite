import { useAtom, useAtomValue } from 'jotai';
import { Dialog, DialogDescription, DialogFooter, Button } from '@/ui/shadcn';
import { InputOrCheckWithTooltip } from "@/ui/local-ui";
import { type ManiNameData, maniNameDlgDataAtom } from '@/store';
import { DialogTitleHeader } from './3-dialog-title-header';

export function ManiNameDialog() {
    const [maniNameDlgData, setManiNameDlgData] = useAtom(maniNameDlgDataAtom);
    if (!maniNameDlgData) {
        return null;
    }

    function onCloseDlg(ok: boolean) {
        if (!maniNameDlgData) {
            throw new Error('no.in.data');
        }
        setManiNameDlgData(undefined);
        maniNameDlgData.resolve(ok);
    }

    return (
        <Dialog open={!!maniNameDlgData} onOpenChange={() => onCloseDlg(false)}>
            <DialogTitleHeader title="New manifest name" className={contentClasses} onDlgClose={onCloseDlg}>
                <DialogBody maniNameData={maniNameDlgData} onCloseDlg={onCloseDlg} />
            </DialogTitleHeader>
        </Dialog>
    );
}

const contentClasses = "p-0 w-72 max-w-sm gap-0 data-[state=open]:[animation-duration:200ms]";

function DialogBody({ maniNameData, onCloseDlg }: { maniNameData: ManiNameData; onCloseDlg: (ok: boolean) => void; }) {

    const { nameAtom } = maniNameData;
    const { data: name } = useAtomValue(nameAtom);

    return (
        <div className="px-4">
            <DialogDescription className="pt-4 pb-2 text-xs text-foreground">
                Please provide a name for the manifest. This name will be used in the list of manifests in the left pane.
            </DialogDescription>

            <div className="pb-3 text-xs flex flex-col gap-0.5">
                Manifest name
                <InputOrCheckWithTooltip stateAtom={nameAtom} />
            </div>

            <DialogFooter className="py-4">
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
