import { useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Dialog, DialogContent, DialogDescription, DialogClose, DialogFooter, DialogHeader, DialogCloseButton } from '@/ui/shadcn/dialog';
import { Button } from '@/ui/shadcn/button';
import { doOpenManiNameDialog2Atom, fileUsOfRightPanelAtom, rightPanelAtom } from '@/store';
import { Input } from '@/ui';

export function ManiNameDialog() {

    const [openManiNameDialog2, doOpenManiNameDialog2] = useAtom(doOpenManiNameDialog2Atom);
    if (!openManiNameDialog2) {
        return null;
    }

    const { resolve } = openManiNameDialog2;

    function onDlgClose(ok: boolean) {
        resolve(ok);
        doOpenManiNameDialog2(undefined);
    }

    return (
        <Dialog open={!!openManiNameDialog2} onOpenChange={() => onDlgClose(false)}>
            <DialogContent
                className={contentClasses}
                hiddenTitle="New manifest name"
                noClose
            >
                <DialogHeader className="relative pl-4 pr-2 py-2 text-sm font-bold border-border border-b flex flex-row items-center justify-between space-y-0">
                    <div>
                        New manifest name
                    </div>
                    <DialogCloseButton className="!relative !right-0 !top-0 p-2 hover:text-white hover:bg-red-500 hover:opacity-100" tabIndex={-1} onClick={() => onDlgClose(false)} />
                </DialogHeader>

                <DialogBody resolve={resolve} />

            </DialogContent>
        </Dialog>
    );
}

const contentClasses = "p-0 max-w-sm gap-0 data-[state=open]:[animation-duration:200ms]";

function DialogBody({resolve}: { resolve: (ok: boolean) => void; }) {

    // const rightPanel = useAtomValue(rightPanelAtom);
    // const fileUs = useAtomValue(fileUsOfRightPanelAtom);
    // if (!fileUs || !rightPanel) {
    //     return null;
    // }

    const [name, setName] = useState('');

    return (
        <div className="px-4">
            <DialogDescription className="pt-4 pb-2 text-xs text-foreground">
                Please provide a name for the manifest. This name will be used in the list of manifests in the left pane.
            </DialogDescription>

            <div className="pb-3 text-xs">
                Manifest name
                <Input className="w-full h-8 text-xs" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <DialogFooter className="py-4">
                <DialogClose asChild>
                    {/* <Button variant="outline"> */}
                    <Button className="min-w-14" variant="default" disabled={!name} onClick={() => resolve(true)}>
                        OK
                    </Button>
                </DialogClose>

                <DialogClose asChild>
                    <Button variant="outline" onClick={() => resolve(false)}>
                        Cancel
                    </Button>
                </DialogClose>

            </DialogFooter>
        </div>
    );
}
