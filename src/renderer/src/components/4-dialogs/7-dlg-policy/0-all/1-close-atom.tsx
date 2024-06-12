import { Getter, PrimitiveAtom, Setter, atom } from "jotai";
import { Mani } from "pm-manifest";
import { PolicyDlgConv } from "./0-conv";
import { toast } from "sonner";
import { updateExplanationAtom } from "./1-util-atoms";

type DoSetResultPoliciesAtomProps = {
    dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms;
    policiesAtom: PrimitiveAtom<Mani.FieldPolicy>;
    openAtom: PrimitiveAtom<boolean>;
    toastIdAtom: PrimitiveAtom<string | number | undefined>;
    byOkButton: boolean;
};

function resetOnCancelClose(get: Getter, set: Setter, { dlgUiAtoms, policiesAtom, toastIdAtom }: DoSetResultPoliciesAtomProps) {
    const toastId = get(toastIdAtom);
    toastId && toast.dismiss(toastId);

    set(policiesAtom, dlgUiAtoms.original);

    // Reset to original values local atoms
    const values: PolicyDlgConv.ForAtoms = PolicyDlgConv.forAtoms(dlgUiAtoms.original);
    values.errorText = '';
    PolicyDlgConv.valuesToAtoms(values, dlgUiAtoms, get, set);

    set(updateExplanationAtom, { dlgUiAtoms, custom: values.custom });

    dlgUiAtoms.changed = false;
}

export const doClosePolicyDlgAtom = atom(null,
    (get: Getter, set: Setter, { dlgUiAtoms, policiesAtom, openAtom, toastIdAtom, byOkButton }: DoSetResultPoliciesAtomProps) => {

        if (!byOkButton) {
            resetOnCancelClose(get, set, { dlgUiAtoms, policiesAtom, openAtom, toastIdAtom, byOkButton });
            set(openAtom, false);
            return;
        }

        const state = PolicyDlgConv.fromAtoms(dlgUiAtoms, get, set);

        if (!dlgUiAtoms.changed) {
            set(openAtom, false);
            return;
        }

        const isCustom = state.isCustom;
        if (isCustom && !state.custom) {
            const msg = 'Custom rule is empty';
            const toastId = toast.error(msg);
            set(dlgUiAtoms.errorTextAtom, msg);
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
