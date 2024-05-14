import { useMemo, useState } from "react";
import { Mani } from "@/store/manifest";
import { createUiAtoms, debouncedCombinedResultFromAtoms } from "./0-create-ui-atoms";
import { Button, Dialog, DialogContent, DialogTrigger } from "@/ui";
import { PolicyEditorBody } from "./2-dlg-body";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { PoliciesForAtoms, policyDialogOpenAtom } from "@/store/atoms/7-dialogs";

export function PolicyEditorDlg({ field }: { field: Mani.Field; }) {
    const [open, setOpen] = useState(false);

    const atoms = useState( //TODO: use memo or update atoms value?
        () => createUiAtoms(
            { policy: field.policy, policy2: field.policy2 },
            ({ get, set }) => {
                //console.log('policy changed', field, field.mani.displayname);
                debouncedCombinedResultFromAtoms(atoms, get, set);
            })
    )[0];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="px-4 h-full active:scale-[.97] select-none" asChild>
                <Button size="sm">
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent className="text-xs" container={document.getElementById('portal')}>
                <PolicyEditorBody atoms={atoms} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
}

export function PolicyEditorNewDlg({ dataAtom }: { dataAtom: PrimitiveAtom<PoliciesForAtoms>; }) {
    const [isOpen, setIsOpen] = useAtom(policyDialogOpenAtom);

    const triggerData = useAtomValue(dataAtom);

    console.log('PolicyEditorNewDlg render', 'open =', isOpen);

    const atoms = useMemo(
        () => {
            console.log('triggerData createUiAtoms()', triggerData);

            return createUiAtoms(
                {
                    policy: triggerData.policy,
                    policy2: triggerData.policy2
                },
                ({ get, set }) => {
                    debouncedCombinedResultFromAtoms(atoms, get, set);
                }
            );
        }, [triggerData]
    );

    // const atoms = useState( //TODO: use memo or update atoms value?
    //     () => createUiAtoms(
    //         { policy: field.policy, policy2: field.policy2 },
    //         ({ get, set }) => {
    //             //console.log('policy changed', field, field.mani.displayname);
    //             debouncedCombinedResultFromAtoms(atoms, get, set);
    //         })
    // )[0];

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* <DialogTrigger className="px-4 h-full active:scale-[.97] select-none" asChild>
                <Button size="sm">
                    Edit
                </Button>
            </DialogTrigger> */}

            <DialogContent className="text-xs" container={document.getElementById('portal')}>
                {/* <PolicyEditorBody atoms={atoms} setOpen={setIsOpen} /> */}
                <PolicyEditorBody atoms={atoms} setOpen={(v) => {
                    console.log('click from body', v);
                    
                    setIsOpen(v);
                }} />
            </DialogContent>
        </Dialog>
    );
}
