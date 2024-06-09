import { useEffect, useMemo } from "react";
import { PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { Mani } from "pm-manifest";
import { createUiAtoms, debouncedCombinedResultFromAtoms } from "./0-create-ui-atoms";
import { Dialog, DialogCloseButton, DialogContent } from "@/ui";
import { PolicyEditorBody } from "./3-dlg-body";
import { doClosePolicyDlgAtom } from "./1-dlg-close-atom";
import { doInitialAtomsSetupAtom } from "./0-util-atoms";

type PolicyEditorNewDlgProps = {
    openAtom: PrimitiveAtom<boolean>;
    toastIdAtom: PrimitiveAtom<string | number | undefined>;
    policiesAtom: PrimitiveAtom<Mani.FieldPolicy>;
};

export function PolicyEditorDlg({ openAtom, toastIdAtom, policiesAtom }: PolicyEditorNewDlgProps) {
    const isOpen = useAtomValue(openAtom);
    const policies = useAtomValue(policiesAtom);

    const doClosePolicyDlg = useSetAtom(doClosePolicyDlgAtom);
    const doInitialAtomsSetup = useSetAtom(doInitialAtomsSetupAtom);

    function doCancelClose() {
        doClosePolicyDlg({ dlgUiAtoms, policiesAtom, openAtom, toastIdAtom, byOkButton: false });
    }

    const dlgUiAtoms = useMemo(() => {
        return createUiAtoms(policies, ({ get, set }) => debouncedCombinedResultFromAtoms(dlgUiAtoms, get, set));
    }, [policies]);

    useEffect(() => {
        doInitialAtomsSetup({ dlgUiAtoms });
    }, [dlgUiAtoms]);

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
