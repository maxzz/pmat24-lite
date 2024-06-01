import { useMemo } from "react";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { createUiAtoms, debouncedCombinedResultFromAtoms } from "./0-create-ui-atoms";
import { Dialog, DialogCloseButton, DialogContent } from "@/ui";
import { PolicyEditorBody } from "./2-dlg-body";
import { TwoFieldPoliciesForAtoms } from "@/store/atoms/7-dialogs";

export function PolicyEditorNewDlg({ openAtom, dataAtom }: { openAtom: PrimitiveAtom<boolean>; dataAtom: PrimitiveAtom<TwoFieldPoliciesForAtoms>; }) {
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

            <DialogContent className="text-xs" container={document.getElementById('portal')} modal withScroll noClose>
                <PolicyEditorBody atoms={atoms} setIsOpen={setIsOpen} />
                <DialogCloseButton className="p-2 top-3 hover:bg-muted active:scale-[.97] focus:ring-0" tabIndex={-1} />
            </DialogContent>

        </Dialog>
    );
}
