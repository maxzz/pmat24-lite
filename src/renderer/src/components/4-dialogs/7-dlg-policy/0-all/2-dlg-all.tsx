import { useEffect, useMemo } from "react";
import { type PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { type Mani } from "@/store/manifest";
import { Dialog, DialogCloseButton, DialogContent } from "@/ui";
import { createUiAtoms, onChangeWithScopeDebounced } from "./0-create-ui-atoms";
import { PolicyEditorBody } from "./3-dlg-body";
import { doClosePolicyDlgAtom } from "./1-do-close-dlg-atom";
import { updateExplanationAtom } from "./1-util-atoms";

export function PolicyEditorDlg({ openAtom, toastIdAtom, policiesAtom }: PolicyEditorNewDlgProps) {
    const isOpen = useAtomValue(openAtom);
    if (!isOpen) {
        return null;
    }

    return (
        <PolicyEditorDlgIsOpen openAtom={openAtom} toastIdAtom={toastIdAtom} policiesAtom={policiesAtom} />
    );
}

type PolicyEditorNewDlgProps = {
    openAtom: PrimitiveAtom<boolean>;
    toastIdAtom: PrimitiveAtom<string | number | undefined>;
    policiesAtom: PrimitiveAtom<Mani.FieldPolicy>;
};

function PolicyEditorDlgIsOpen({ openAtom, toastIdAtom, policiesAtom }: PolicyEditorNewDlgProps) {
    const isOpen = useAtomValue(openAtom);
    const doClosePolicyDlg = useSetAtom(doClosePolicyDlgAtom);

    const policies = useAtomValue(policiesAtom);
    const doUpdateExplanation = useSetAtom(updateExplanationAtom);

    function closeDlg(ok: boolean) {
        doClosePolicyDlg({ dlgUiCtx, policiesAtom, openAtom, toastIdAtom, byOkButton: ok });
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
        <Dialog open={isOpen} onOpenChange={() => closeDlg(false)} modal>

            <DialogContent className="px-6 py-4 max-w-[500px] text-xs select-none" modal withScroll noClose>
                <PolicyEditorBody dlgUiCtx={dlgUiCtx} closeDlg={closeDlg} />
                
                <DialogCloseButton className="p-2 top-3 hover:text-white hover:bg-red-500 hover:opacity-100 active:scale-[.97] focus:ring-0 transition-colors" tabIndex={-1} />
            </DialogContent>

        </Dialog>
    );
}
