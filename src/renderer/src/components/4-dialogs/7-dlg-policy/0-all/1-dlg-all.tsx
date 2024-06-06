import { useEffect, useMemo, useState } from "react";
import { Getter, PrimitiveAtom, Setter, atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { Mani, namesConstrainSet } from "pm-manifest";
import { createUiAtoms, debouncedCombinedResultFromAtoms } from "./0-create-ui-atoms";
import { Dialog, DialogCloseButton, DialogContent } from "@/ui";
import { PolicyEditorBody } from "./2-dlg-body";
import { PolicyDlgConv } from "./0-conv";
import { toast } from "sonner";

type PolicyEditorNewDlgProps = {
    openAtom: PrimitiveAtom<boolean>;
    policiesAtom: PrimitiveAtom<Mani.FieldPolicy>;
};

type DoSetResultPoliciesAtomProps = {
    dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms;
    policiesAtom: PrimitiveAtom<Mani.FieldPolicy>;
    openAtom: PrimitiveAtom<boolean>;
    toastIdAtom: PrimitiveAtom<string | number | undefined>;
    byOkButton: boolean;
};

const doSetResultPoliciesAtom = atom(null,
    (get: Getter, set: Setter, { dlgUiAtoms, policiesAtom, openAtom, toastIdAtom, byOkButton }: DoSetResultPoliciesAtomProps) => {
        if (!byOkButton) {
            //TODO: reset to original values local atoms
            
            const toastId = get(toastIdAtom);
            toastId && toast.dismiss(toastId);

            set(openAtom, false);
            return;
        }

        const state = PolicyDlgConv.fromAtoms(dlgUiAtoms, get, set);

        if (!dlgUiAtoms.changed) {
            set(openAtom, false);
            return;
        }

        const isCustom = +state.constrainSet > namesConstrainSet.length - 1;
        if (isCustom && !state.custom) {
            const toastId = toast.error('Dlg. close: Custom rule is empty');
            set(toastIdAtom, toastId);
            return;
        }

        const isValid = !state.minLen.error && !state.maxLen.error && +state.minLen.data <= +state.maxLen.data;
        if (!isValid) {
            const msg = state.minLen.error || state.maxLen.error || 'Min length must be less than max length';
         
            const toastId = toast.error(msg);
            set(toastIdAtom, toastId);

            console.log('Dlg. close: toastId from atom', toastId);
            return;
        }

        const strings = PolicyDlgConv.forMani(state);

        //TODO: get access to setManiChanges()

        set(policiesAtom, strings);


        const str1 = JSON.stringify(state, null, 2);
        const str2 = JSON.stringify(strings, null, 2);
        const str3 = dlgUiAtoms.changed ? `\nstate ${str1}\nfile ${str2}` : '';
        console.log(`%cDlg. changed=${dlgUiAtoms.changed}%c${str3}`, 'background-color: purple; color: bisque', 'background-color: #282828; color: white');

        set(openAtom, false);
    }
);

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
        //TODO: reset to original values local atoms
        console.log('Dlg. doCancelClose. toastId =', toastId);

        //toastId && toast.dismiss(toastId);

        doSetResultPolicies({ dlgUiAtoms, policiesAtom, openAtom, toastIdAtom, byOkButton: false })
        //setIsOpen(false);
    }

    const doSetResultPolicies = useSetAtom(doSetResultPoliciesAtom);

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
                    doCloseWithOk={(ok) => doSetResultPolicies({ dlgUiAtoms, policiesAtom, openAtom, toastIdAtom, byOkButton: ok })}
                />

                <DialogCloseButton className="p-2 top-3 hover:bg-muted active:scale-[.97] focus:ring-0" tabIndex={-1} />
            </DialogContent>

        </Dialog>
    );
}
