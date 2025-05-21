import { useEffect, useMemo } from "react";
import { type PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { Dialog, DialogCloseButton, DialogContent } from "@/ui";
import { type Mani } from "@/store/manifest";
import { createUiAtoms, onChangeWithScopeDebounced } from "./0-create-ui-atoms";
import { doClosePolicyDlgAtom } from "./1-do-close-dlg-atom";
import { doUpdateExplanationAtom } from "./1-util-atoms";
import { PolicyEditorBody } from "./3-dlg-body";
import { DialogTitleHeader } from "../../5-confirm/3-dialog-title-header";

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

            {/* <DialogContent className={contentClasses} modal withScroll noClose>
                <PolicyEditorBody dlgUiCtx={dlgUiCtx} closeDlg={closeDlg} />
                
                <DialogCloseButton className="p-2 top-3 hover:text-white hover:bg-red-500 hover:opacity-100 active:scale-[.97] focus:ring-0 transition-colors" tabIndex={-1} />
            </DialogContent> */}

            <DialogTitleHeader title="Password Policy Editor" className={contentClasses} onDlgClose={closeDlg}>
                <PolicyEditorBody dlgUiCtx={dlgUiCtx} closeDlg={closeDlg} />
            </DialogTitleHeader>

        </Dialog>
    );
}

const contentClasses = "p-0 pb-2 w-fit min-w-[420px] max-w-[500px] text-xs gap-1 select-none";
