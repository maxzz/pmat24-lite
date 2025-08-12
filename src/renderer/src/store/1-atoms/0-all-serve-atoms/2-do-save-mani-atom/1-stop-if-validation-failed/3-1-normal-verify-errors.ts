import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type FieldRowCtx, type VerifyError } from "@/store/1-atoms/2-file-mani-atoms/9-types";

export function normalFormVerifyErrors(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    const rv: VerifyError[] = [];

    const formCtx = maniAtoms[formIdx];

    if (formCtx?.normal && !totalFieldsInUse(formCtx.normal.rowCtxs, getset)) {
        if (formIdx === FormIdx.login) {
            rv.push({ error: 'No login fields selected', tab: 'login' });
        } else if (formIdx === FormIdx.cpass) {
            rv.push({ error: 'No password change fields selected', tab: 'cpass' });
        }
    }

    return rv.length ? rv : undefined;
}

function totalFieldsInUse(rowCtxs: FieldRowCtx[] | undefined, { get }: GetSet): number {
    let totalUseIt = 0;
    rowCtxs?.forEach(
        (fieldRowCtx) => {
            const useIt = get(fieldRowCtx.useItAtom);
            if (useIt) {
                totalUseIt++;
            }
        }
    );
    return totalUseIt;
}

//TODO: We can remove the button elements if the form is intended for websites. Buttons were added for old IE submit method.
