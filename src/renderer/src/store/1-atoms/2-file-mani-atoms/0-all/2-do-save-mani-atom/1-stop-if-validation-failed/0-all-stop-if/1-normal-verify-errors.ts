import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type FieldRowCtx, type VerifyError } from "../../../../9-types";

export function normalFormVerifyErrors([login, cpass]: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    const rv: VerifyError[] = [];

    const formCtx = formIdx === FormIdx.login ? login : formIdx === FormIdx.cpass ? cpass : undefined;

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
