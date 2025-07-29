import { type Getter, type Setter } from "jotai";
import { type ManiAtoms, type FieldRowCtx, type VerifyError } from "../../../../9-types";

export function normalFormsVerifyErrors(get: Getter, set: Setter, { maniAtoms }: { maniAtoms: ManiAtoms; }): VerifyError[] | undefined {
    const rv: VerifyError[] = [];
    const [login, cpass] = maniAtoms;

    if (login?.normal && !totalFieldsInUse(login.normal.rowCtxs, get)) {
        rv.push({ error: 'No login fields selected', tab: 'login' });
    }

    if (cpass?.normal && !totalFieldsInUse(cpass.normal.rowCtxs, get)) {
        rv.push({ error: 'No password change fields selected', tab: 'cpass' });
    }

    return rv.length ? rv : undefined;
}

function totalFieldsInUse(rowCtxs: FieldRowCtx[] | undefined, get: Getter): number {
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
