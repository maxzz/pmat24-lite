import { atom } from "jotai";
import { Mani } from "@/store/manifest";
import { PolicyDlgConv, type PolicyDlgTypes } from "./0-conv";
import { toaster } from "@/ui/local-ui";
import { doUpdateExplanationAtom } from "./1-util-atoms";

type DoClosePolicyDlgAtomCtx = {
    dlgUiCtx: PolicyDlgTypes.PolicyUiCtx;
    policiesAtom: PA<Mani.FieldPolicy>;
    openAtom: PA<boolean>;
    toastIdAtom: PA<string | number | undefined>;
    byOkButton: boolean;
};

export const doClosePolicyDlgAtom = atom(null,
    (get: Getter, set: Setter, ctx: DoClosePolicyDlgAtomCtx) => {
        const { dlgUiCtx, policiesAtom, openAtom, toastIdAtom, byOkButton } = ctx;

        if (!dlgUiCtx.changed) {
            set(openAtom, false);
            return;
        }

        if (!byOkButton) {
            resetOnCancelClose(ctx, { get, set });
            set(openAtom, false);
            return;
        }

        const state = PolicyDlgConv.fromAtoms(dlgUiCtx, { get });

        const isCustom = state.isCustom;
        if (isCustom && !state.custom) {
            const msg = 'Custom rule is empty';
            const toastId = toaster.error(msg);
            set(dlgUiCtx.errorTextAtom, msg);
            set(toastIdAtom, toastId);
            return;
        }

        const isValid = !state.minLen.error && !state.maxLen.error && +state.minLen.data <= +state.maxLen.data;
        if (!isValid) {
            const msg = state.minLen.error || state.maxLen.error || 'Min length must be less than max length';

            const toastId = toaster.error(msg);
            set(toastIdAtom, toastId);

            console.log('Dlg. close: toastId from atom', toastId);
            return;
        }

        const policyStrings = PolicyDlgConv.forMani(state);
        set(policiesAtom, policyStrings);

        /**/
        const str1 = JSON.stringify(state, null, 2);
        const str2 = JSON.stringify(policyStrings, null, 2);
        const str3 = dlgUiCtx.changed ? `\nstate ${str1}\nfile ${str2}` : '';
        console.log(`%cDlg. changed=${dlgUiCtx.changed}%c${str3}`, 'background-color: purple; color: bisque', 'background-color: #282828; color: white');
        /**/

        set(openAtom, false);
    }
);

function resetOnCancelClose({ dlgUiCtx, policiesAtom, toastIdAtom }: DoClosePolicyDlgAtomCtx, { get, set }: GetSet) {
    const toastId = get(toastIdAtom);
    toastId && toaster.dismiss(toastId);

    set(policiesAtom, dlgUiCtx.original);

    // Reset to original values local atoms
    const values: PolicyDlgTypes.ForAtoms = PolicyDlgConv.forAtoms(dlgUiCtx.original);
    values.errorText = '';
    PolicyDlgConv.valuesToAtoms(values, dlgUiCtx, { set });

    set(doUpdateExplanationAtom, { dlgUiCtx: dlgUiCtx, custom: values.custom });

    dlgUiCtx.changed = false;
}
