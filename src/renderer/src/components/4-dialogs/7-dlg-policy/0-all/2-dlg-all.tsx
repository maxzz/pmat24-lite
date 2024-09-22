import { useEffect, useMemo } from "react";
import { PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { Mani } from "@/store/manifest";
import { createUiAtoms, onChangeWithScopeDebounced } from "./0-create-ui-atoms";
import { Dialog, DialogCloseButton, DialogContent } from "@/ui";
import { PolicyEditorBody } from "./3-dlg-body";
import { doClosePolicyDlgAtom } from "./1-close-atom";
import { updateExplanationAtom } from "./1-util-atoms";

type PolicyEditorNewDlgProps = {
    openAtom: PrimitiveAtom<boolean>;
    toastIdAtom: PrimitiveAtom<string | number | undefined>;
    policiesAtom: PrimitiveAtom<Mani.FieldPolicy>;
};

export function PolicyEditorDlgGuarded({ openAtom, toastIdAtom, policiesAtom }: PolicyEditorNewDlgProps) {
    const isOpen = useAtomValue(openAtom);
    const policies = useAtomValue(policiesAtom);

    const doInitialAtomsSetup = useSetAtom(updateExplanationAtom);
    const doClosePolicyDlg = useSetAtom(doClosePolicyDlgAtom);

    function doCancelClose() {
        doClosePolicyDlg({ dlgUiAtoms, policiesAtom, openAtom, toastIdAtom, byOkButton: false });
    }

    const dlgUiAtoms = useMemo(
        () => {
            console.log('%cDlg. useMemo to PolicyEditorDlg', 'color: #ffa200', { policies });
            
            function onChange({ get, set }) {
                onChangeWithScopeDebounced(dlgUiAtoms, get, set);
            }
            return createUiAtoms(policies, onChange);
        }, [policies.policy, policies.policy2, policies.options]
    );

    useEffect(() => {
        doInitialAtomsSetup({ dlgUiAtoms });
    }, [dlgUiAtoms]);

    return (
        <Dialog open={isOpen} onOpenChange={doCancelClose} modal>

            <DialogContent
                className="px-6 py-4 max-w-[500px] text-xs select-none"
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

export function PolicyEditorDlg({ openAtom, toastIdAtom, policiesAtom }: PolicyEditorNewDlgProps) {
    const isOpen = useAtomValue(openAtom);
    if (!isOpen) {
        return null;
    }
    return <PolicyEditorDlgGuarded openAtom={openAtom} toastIdAtom={toastIdAtom} policiesAtom={policiesAtom} />;
}