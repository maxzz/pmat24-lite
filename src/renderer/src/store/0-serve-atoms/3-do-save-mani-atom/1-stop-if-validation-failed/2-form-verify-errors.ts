import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type FieldRowCtx, type VerifyError } from "@/store/2-file-mani-atoms/9-types";
import { getFormVerifyErrors } from "./3-form-manual-verify-errors";

// Manual form

export function getVerifyErrors_ManualForm(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    const formCtx = maniAtoms[formIdx];
    if (!formCtx?.manual) {
        return;
    }

    const rv: VerifyError[] = getFormVerifyErrors(formCtx.manual, formIdx, getset);
    return rv.length ? rv : undefined;
};

// Normal form

export function getVerifyErrors_NormalForm(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {

    const formCtx = maniAtoms[formIdx];
    if (!formCtx?.normal) {
        return;
    }

    const rv: VerifyError[] = [];

    const totalUseIt = totalFieldsInUse(formCtx.normal.rowCtxs, getset);
    if (!totalUseIt) {
        rv.push({
            error: formIdx === FormIdx.login ? 'No login fields selected' : 'No password change fields selected',
            tab: formIdx === FormIdx.login ? 'login' : 'cpass',
        });
    }

    return rv.length ? rv : undefined;
}

function totalFieldsInUse(rowCtxs: FieldRowCtx[] | undefined, { get }: GetSet): number {
    let rv = 0;

    rowCtxs?.forEach(
        (fieldRowCtx) => {
            const useIt = get(fieldRowCtx.useItAtom);
            if (useIt) {
                rv++;
            }
        }
    );

    return rv;
    //TODO: We can remove the button elements if the form is intended for websites. Buttons were added for old IE submit method.
}
