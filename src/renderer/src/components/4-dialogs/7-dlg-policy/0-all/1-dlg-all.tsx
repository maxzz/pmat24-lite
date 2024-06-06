import { useEffect, useMemo, useState } from "react";
import { PrimitiveAtom, atom, useAtomValue, useSetAtom } from "jotai";
import { Mani } from "pm-manifest";
import { createUiAtoms, debouncedCombinedResultFromAtoms } from "./0-create-ui-atoms";
import { Dialog, DialogCloseButton, DialogContent } from "@/ui";
import { PolicyEditorBody } from "./2-dlg-body";
import { toast } from "sonner";
import { doClosePolicyDlgAtom } from "./3-dlg-do-close-atom";

type PolicyEditorNewDlgProps = {
    openAtom: PrimitiveAtom<boolean>;
    policiesAtom: PrimitiveAtom<Mani.FieldPolicy>;
};

export function PolicyEditorNewDlg({ openAtom, policiesAtom }: PolicyEditorNewDlgProps) {
    const isOpen= useAtomValue(openAtom);
    const policies = useAtomValue(policiesAtom);

    const toastIdAtom = useState(() => atom<string | number | undefined>(undefined))[0];
    const toastId = useAtomValue(toastIdAtom);

    useEffect(
        () => () => {
            console.log('Dlg. useEffect cleanup. toastId =', toastId);

            toastId && toast.dismiss(toastId);
        }, [toastId]
    );

    function doCancelClose() {
        console.log('Dlg. doClosePolicyDlg by cancel. toastId =', toastId);

        doClosePolicyDlg({ dlgUiAtoms, policiesAtom, openAtom, toastIdAtom, byOkButton: false })
    }

    const doClosePolicyDlg = useSetAtom(doClosePolicyDlgAtom);

    const dlgUiAtoms = useMemo(
        () => {
            console.log('Dlg. useMemo');

            return createUiAtoms(policies, ({ get, set }) => debouncedCombinedResultFromAtoms(dlgUiAtoms, get, set));
        }, [policies]
    );

    return (
        <Dialog open={isOpen} onOpenChange={doCancelClose} modal>

            <DialogContent
                className="px-6 py-4 max-w-[480px] text-xs select-none"
                container={document.getElementById('portal')}
                modal
                withScroll
                noClose
            >
                <PolicyEditorBody
                    dlgUiAtoms={dlgUiAtoms}
                    doCloseWithOk={(ok) => doClosePolicyDlg({ dlgUiAtoms, policiesAtom, openAtom, toastIdAtom, byOkButton: ok })}
                />

                <DialogCloseButton className="p-2 top-3 hover:bg-muted active:scale-[.97] focus:ring-0" tabIndex={-1} />
            </DialogContent>

        </Dialog>
    );
}
