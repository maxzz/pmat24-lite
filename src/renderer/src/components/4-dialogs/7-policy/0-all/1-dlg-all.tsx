import { useMemo } from "react";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { Mani } from "pm-manifest";
import { createUiAtoms, debouncedCombinedResultFromAtoms } from "./0-create-ui-atoms";
import { Dialog, DialogCloseButton, DialogContent } from "@/ui";
import { PolicyEditorBody } from "./2-dlg-body";

type PolicyEditorNewDlgProps = {
    openAtom: PrimitiveAtom<boolean>;
    policiesAtom: PrimitiveAtom<Mani.FieldPolicy>;
};

export function PolicyEditorNewDlg({ openAtom, policiesAtom }: PolicyEditorNewDlgProps) {
    const [isOpen, setIsOpen] = useAtom(openAtom);
    const policies = useAtomValue(policiesAtom);

    const atoms = useMemo(
        () => {
            return createUiAtoms(
                {
                    policy: policies.policy,
                    policy2: policies.policy2
                },
                ({ get, set }) => {
                    debouncedCombinedResultFromAtoms(atoms, get, set);
                }
            );
        }, [policies]
    );

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal>

            <DialogContent className="px-6 py-4 max-w-[480px] text-xs select-none" container={document.getElementById('portal')} modal withScroll noClose>
                <PolicyEditorBody atoms={atoms} setIsOpen={setIsOpen} />
                <DialogCloseButton className="p-2 top-3 hover:bg-muted active:scale-[.97] focus:ring-0" tabIndex={-1} />
            </DialogContent>

        </Dialog>
    );
}
