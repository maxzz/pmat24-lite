import { FieldTyp, FormIdx } from "@/store/manifest";
import { type ManiAtoms, type FieldRowCtx, type VerifyError } from "@/store/2-file-mani-atoms/9-types";
import { getVerifyErrors_FromManualForm } from "./3-form-manual-verify-errors";
import { use } from "react";
import { is } from "@electron-toolkit/utils";

// Manual form

export function getVerifyErrors_ManualForm(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    const formCtx = maniAtoms[formIdx];
    if (!formCtx?.manual) {
        return;
    }

    const rv: VerifyError[] = getVerifyErrors_FromManualForm(formCtx.manual, formIdx, getset);
    return rv.length ? rv : undefined;
};

// Normal form

export function getVerifyErrors_NormalForm(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {

    const formCtx = maniAtoms[formIdx];
    if (!formCtx?.normal) {
        return;
    }

    const rv: VerifyError[] = [];

    const { useIt } = totalFieldsInUse(formCtx.normal.rowCtxs, getset);
    if (!useIt) {
        rv.push({
            error: formIdx === FormIdx.login ? 'No login fields selected' : 'No password change fields selected',
            tab: formIdx === FormIdx.login ? 'login' : 'cpass',
        });
    }

    return rv.length ? rv : undefined;
}

function totalFieldsInUse(rowCtxs: FieldRowCtx[] | undefined, { get }: GetSet) {
    let rv = {
        useIt: 0,
        psw: 0,
        current: 0,
        newpsw: 0,
        linked: 0,
    };

    rowCtxs?.forEach(
        (fieldRowCtx) => {
            const useIt = get(fieldRowCtx.useItAtom);
            const fieldTyp: FieldTyp = get(fieldRowCtx.typeAtom);
            const isPsw = fieldTyp === FieldTyp.psw;
            const rfield = get(fieldRowCtx.rfieldAtom);
            const rfiledUuid = get(fieldRowCtx.rfieldUuidAtom);

            if (useIt) {
                rv.useIt++;

                if (isPsw) {
                    rv.psw++;

                    const isCurrent = rfield === 'in';
                    const isNew = rfield === 'out';

                    if (isCurrent || isNew) {
                        const isLinked = !!rfiledUuid;
                        if (isLinked) {
                            rv.linked++;

                            if (isCurrent) {
                                rv.current++;
                            } else if (isNew) {
                                rv.newpsw++;
                            }
                        }
                    }
                }

            }
        }
    );

    return rv;
    //TODO: We can remove the button elements if the form is intended for websites. Buttons were added for old IE submit method.
}
