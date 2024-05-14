import { useMemo } from "react";
import { createUiAtoms, debouncedCombinedResultFromAtoms } from "./0-create-ui-atoms";
import { Dialog, DialogContent } from "@/ui";
import { PolicyEditorBody } from "./2-dlg-body";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { PoliciesForAtoms } from "@/store/atoms/7-dialogs";

export function PolicyEditorNewDlg({ dataAtom, openAtom }: { dataAtom: PrimitiveAtom<PoliciesForAtoms>; openAtom: PrimitiveAtom<boolean>; }) {
    const [isOpen, setIsOpen] = useAtom(openAtom);
    const triggerData = useAtomValue(dataAtom);

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

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>

            <DialogContent className="text-xs" container={document.getElementById('portal')}>
                <PolicyEditorBody atoms={atoms} setOpen={setIsOpen} />
            </DialogContent>

        </Dialog>
    );
}
