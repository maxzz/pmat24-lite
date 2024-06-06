import { Getter, PrimitiveAtom, Setter, atom } from "jotai";
import { Mani } from "pm-manifest";
import { PolicyDlgConv } from "./0-conv";
import { toast } from "sonner";

type DoSetResultPoliciesAtomProps = {
    dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms;
    policiesAtom: PrimitiveAtom<Mani.FieldPolicy>;
    openAtom: PrimitiveAtom<boolean>;
    toastIdAtom: PrimitiveAtom<string | number | undefined>;
    byOkButton: boolean;
};

export const doClosePolicyDlgAtom = atom(null,
    (get: Getter, set: Setter, { dlgUiAtoms, policiesAtom, openAtom, toastIdAtom, byOkButton }: DoSetResultPoliciesAtomProps) => {
        if (!byOkButton) {
            const toastId = get(toastIdAtom);
            toastId && toast.dismiss(toastId);

            //TODO: reset to original values local atoms
            set(policiesAtom, dlgUiAtoms.original);
            dlgUiAtoms.changed = false;

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
            const toastId = toast.error('Custom rule is empty');
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
