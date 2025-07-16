import { useEffect, useMemo } from "react";
import { type PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { Dialog } from "@/ui";
import { type Mani } from "@/store/manifest";
import { createUiAtoms, debouncedOnChangeWithScope } from "../0-create-ui-atoms";
import { doClosePolicyDlgAtom } from "../1-do-close-dlg-atom";
import { doUpdateExplanationAtom } from "../1-util-atoms";
import { PolicyEditorBody } from "./2-dlg-body";

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
    const doUpdateExplanation = useSetAtom(doUpdateExplanationAtom);

    function closeDlg(ok: boolean) {
        doClosePolicyDlg({ dlgUiCtx, policiesAtom, openAtom, toastIdAtom, byOkButton: ok });
    }

    const dlgUiCtx = useMemo(
        () => {
            function onChange({ get, set }) {
                debouncedOnChangeWithScope(dlgUiCtx, get, set);
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
            <PolicyEditorBody dlgUiCtx={dlgUiCtx} closeDlg={closeDlg} />
        </Dialog>
    );
}
