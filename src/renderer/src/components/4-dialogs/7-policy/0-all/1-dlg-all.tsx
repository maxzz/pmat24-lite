import { useMemo, useState } from "react";
import { Getter, PrimitiveAtom, Setter, atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { Mani } from "pm-manifest";
import { createUiAtoms, debouncedCombinedResultFromAtoms } from "./0-create-ui-atoms";
import { Dialog, DialogCloseButton, DialogContent } from "@/ui";
import { PolicyEditorBody } from "./2-dlg-body";
import { PolicyDlgConv } from "./0-conv";

type PolicyEditorNewDlgProps = {
    openAtom: PrimitiveAtom<boolean>;
    policiesAtom: PrimitiveAtom<Mani.FieldPolicy>;
};

function applyPolicyChanges(get: Getter, set: Setter, dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms) {
    const state = PolicyDlgConv.fromAtoms(dlgUiAtoms, get, set);

    if (!dlgUiAtoms.changed) {
        return;
    }
    const strings = PolicyDlgConv.forMani(state);

    //TODO: get access to setManiChanges()

    console.log(`PolicyEditorNewDlg changed=${dlgUiAtoms.changed}`, JSON.stringify(state, null, 2));
    console.log(`PolicyEditorNewDlg changed=${dlgUiAtoms.changed}`, JSON.stringify(strings, null, 2));
}

export function PolicyEditorNewDlg({ openAtom, policiesAtom }: PolicyEditorNewDlgProps) {
    const [isOpen, setIsOpen] = useAtom(openAtom);
    const policies = useAtomValue(policiesAtom);

    const doSetResultAtom = useState(() => atom(null, applyPolicyChanges))[0];
    const doSetResult = useSetAtom(doSetResultAtom);

    const dlgUiAtoms = useMemo(
        () => {
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
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal>

            <DialogContent
                className="px-6 py-4 max-w-[480px] text-xs select-none"
                container={document.getElementById('portal')}
                modal
                withScroll
                noClose
            >
                <PolicyEditorBody
                    dlgUiAtoms={dlgUiAtoms}
                    doCloseWithOk={(ok) => {
                        if (ok) {
                            doSetResult(dlgUiAtoms);
                        }
                        setIsOpen(false);
                    }}
                />

                <DialogCloseButton className="p-2 top-3 hover:bg-muted active:scale-[.97] focus:ring-0" tabIndex={-1} />
            </DialogContent>

        </Dialog>
    );
}
