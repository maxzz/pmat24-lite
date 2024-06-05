import { useEffect, useMemo, useState } from "react";
import { Getter, PrimitiveAtom, Setter, atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { Mani } from "pm-manifest";
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
    policiesAtom: PrimitiveAtom<Mani.FieldPolicy>;
    dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms;
    openAtom: PrimitiveAtom<boolean>;
    toastIdAtom: PrimitiveAtom<string | number | undefined>;
    ok: boolean;
};

const doSetResultPoliciesAtom = atom(null,
    (get: Getter, set: Setter, { policiesAtom, dlgUiAtoms, openAtom, toastIdAtom, ok }: DoSetResultPoliciesAtomProps) => {
        if (!ok) {
            //TODO: reset to original values local atoms
            set(openAtom, false);
            return;
        }

        const state = PolicyDlgConv.fromAtoms(dlgUiAtoms, get, set);

        if (!dlgUiAtoms.changed) {
            set(openAtom, false);
            return;
        }

        const isValid = !state.minLen.error && !state.maxLen.error && +state.minLen.data <= +state.maxLen.data;
        if (!isValid) {
            const msg = state.minLen.error || state.maxLen.error || 'Min length must be less than max length';
            const toastId = toast.error(msg);
            console.log('toastId from atom', toastId);
            
            set(toastIdAtom, toastId);
            return;
        }

        const strings = PolicyDlgConv.forMani(state);

        //TODO: get access to setManiChanges()

        set(policiesAtom, strings);

        console.log(`PolicyEditorNewDlg changed=${dlgUiAtoms.changed}`, JSON.stringify(state, null, 2));
        console.log(`PolicyEditorNewDlg changed=${dlgUiAtoms.changed}`, JSON.stringify(strings, null, 2));

        set(openAtom, false);
    }
);

export function PolicyEditorNewDlg({ openAtom, policiesAtom }: PolicyEditorNewDlgProps) {
    const [isOpen, setIsOpen] = useAtom(openAtom);
    const policies = useAtomValue(policiesAtom);

    const toastIdAtom = useState(() => atom<string | number | undefined>(undefined))[0];
    const toastId = useAtomValue(toastIdAtom);

    useEffect(
        () => () => {
            console.log('toastId cleanup', toastId);

            toastId && toast.dismiss(toastId);
        }, [toastId]
    );

    function doCancelClose() {
        //TODO: reset to original values local atoms
        console.log('PolicyEditorNewDlg doCancelClose');
        
        setIsOpen(false);
    }

    const doSetResultPolicies = useSetAtom(doSetResultPoliciesAtom);

    const dlgUiAtoms = useMemo(
        () => {
            console.log('PolicyEditorNewDlg useMemo');

            return createUiAtoms(
                {
                    policy: policies.policy,
                    policy2: policies.policy2,
                    options: policies.options,
                },
                ({ get, set }) => {
                    debouncedCombinedResultFromAtoms(dlgUiAtoms, get, set);
                }
            );
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
                    doCloseWithOk={(ok) => doSetResultPolicies({ policiesAtom, dlgUiAtoms, openAtom, toastIdAtom, ok })}
                />

                <DialogCloseButton className="p-2 top-3 hover:bg-muted active:scale-[.97] focus:ring-0" tabIndex={-1} />
            </DialogContent>

        </Dialog>
    );
}
