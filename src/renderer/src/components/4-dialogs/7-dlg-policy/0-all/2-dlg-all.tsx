import { useEffect, useMemo } from "react";
import { type PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { type Mani } from "@/store/manifest";
import { Dialog, DialogCloseButton, DialogContent } from "@/ui";
import { createUiAtoms, onChangeWithScopeDebounced } from "./0-create-ui-atoms";
import { PolicyEditorBody } from "./3-dlg-body";
import { doClosePolicyDlgAtom } from "./1-close-atom";
import { updateExplanationAtom } from "./1-util-atoms";

type PolicyEditorNewDlgProps = {
    openAtom: PrimitiveAtom<boolean>;
    toastIdAtom: PrimitiveAtom<string | number | undefined>;
    policiesAtom: PrimitiveAtom<Mani.FieldPolicy>;
};

function PolicyEditorDlgIsOpen({ openAtom, toastIdAtom, policiesAtom }: PolicyEditorNewDlgProps) {
    const isOpen = useAtomValue(openAtom);
    const policies = useAtomValue(policiesAtom);

    const doUpdateExplanation = useSetAtom(updateExplanationAtom);
    const doClosePolicyDlg = useSetAtom(doClosePolicyDlgAtom);

    function closeWithOk(byOkButton: boolean) {
        doClosePolicyDlg({ dlgUiCtx, policiesAtom, openAtom, toastIdAtom, byOkButton });
    }

    const dlgUiCtx = useMemo(
        () => {
            function onChange({ get, set }) {
                onChangeWithScopeDebounced(dlgUiCtx, get, set);
            }
            return createUiAtoms(policies, onChange);
        }, [policies.policy, policies.policy2, policies.options]
    );

    useEffect(
        () => {
            doUpdateExplanation({ dlgUiCtx });
        }, [dlgUiCtx]
    );

    return (
        <Dialog open={isOpen} onOpenChange={() => closeWithOk(false)} modal>

            <DialogContent
                className="px-6 py-4 max-w-[500px] text-xs select-none"
                container={document.getElementById('portal')}
                modal
                withScroll
                noClose
            >
                <PolicyEditorBody dlgUiCtx={dlgUiCtx} doCloseWithOk={closeWithOk} />
                
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

    return (
        <PolicyEditorDlgIsOpen openAtom={openAtom} toastIdAtom={toastIdAtom} policiesAtom={policiesAtom} />
    );
}
