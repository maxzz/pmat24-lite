import { useMemo } from "react";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { createUiAtoms, debouncedCombinedResultFromAtoms } from "./0-create-ui-atoms";
import { Dialog, DialogContent } from "@/ui";
import { PolicyEditorBody } from "./2-dlg-body";
import { PoliciesForAtoms } from "@/store/atoms/7-dialogs";

export function PolicyEditorNewDlg({ openAtom, dataAtom }: { openAtom: PrimitiveAtom<boolean>; dataAtom: PrimitiveAtom<PoliciesForAtoms>; }) {
    const [isOpen, setIsOpen] = useAtom(openAtom);
    const triggerData = useAtomValue(dataAtom);

    const atoms = useMemo(
        () => {
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
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal>

            <DialogContent className="text-xs" container={document.getElementById('portal')} withScroll onPointerDownOutside={(e) => e.preventDefault()}>
                <PolicyEditorBody atoms={atoms} setIsOpen={setIsOpen} />
            </DialogContent>

        </Dialog>
    );
}
