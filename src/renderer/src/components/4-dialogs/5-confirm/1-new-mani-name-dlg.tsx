import { useAtom, useAtomValue } from 'jotai';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogCloseButton, Button } from '@/ui/shadcn';
import { InputOrCheckWithTooltip } from "@/ui/local-ui";
import { type ManiNameData, maniNameDlgDataAtom } from '@/store';

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
            <DialogContent className={contentClasses} hiddenTitle="New manifest name" noClose>
                <DialogHeader className="relative pl-4 pr-2 py-2 text-sm font-bold border-border border-b flex flex-row items-center justify-between space-y-0">
                    <div>
                        New manifest name
                    </div>
                    <DialogCloseButton className="!relative !right-0 !top-0 p-2 hover:text-white hover:bg-red-500 hover:opacity-100" tabIndex={-1} onClick={() => onCloseDlg(false)} />
                </DialogHeader>

                <DialogBody maniNameData={maniNameDlgData} onCloseDlg={onCloseDlg} />

            </DialogContent>
        </Dialog>
    );
}

const contentClasses = "p-0 max-w-sm gap-0 data-[state=open]:[animation-duration:200ms]";

function DialogBody({ maniNameData, onCloseDlg }: { maniNameData: ManiNameData; onCloseDlg: (ok: boolean) => void; }) {

    const { nameAtom } = maniNameData;
    const { data: name } = useAtomValue(nameAtom);

    return (
        <div className="px-4">
            <DialogDescription className="pt-4 pb-2 text-xs text-foreground">
                Please provide a name for the manifest. This name will be used in the list of manifests in the left pane.
            </DialogDescription>

            <div className="pb-3 text-xs">
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
