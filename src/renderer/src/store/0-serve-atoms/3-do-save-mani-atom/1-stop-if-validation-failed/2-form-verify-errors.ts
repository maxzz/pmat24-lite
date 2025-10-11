import { FieldTyp, FormIdx } from "@/store/manifest";
import { type ManiAtoms, type FieldRowCtx, type VerifyError, type ManiTabValue } from "@/store/2-file-mani-atoms/9-types";
import { getVerifyErrors_FromManualForm } from "./3-form-manual-verify-errors";
import { link } from "fs";

// Manual form

export function getVerifyErrors_ManualForm(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    const formCtx = maniAtoms[formIdx];
    if (!formCtx?.manual) {
        return;
    }

    const rv: VerifyError[] = getVerifyErrors_FromManualForm(formCtx.manual, formIdx, getset);
    return rv;
};

// Normal form

export function getVerifyErrors_NormalForm(maniAtoms: ManiAtoms, formIdx: FormIdx, getset: GetSet): VerifyError[] | undefined {
    const formCtx = maniAtoms[formIdx];
    if (!formCtx?.normal) {
        return;
    }

    const isLogin = formIdx === FormIdx.login;
    let tab: ManiTabValue = isLogin ? 'login' : 'cpass';

    const { useItAny, useItPsw, pswCur, pswNew, linkedCur, linkedNew } = totalFieldsInUse(formCtx.normal.rowCtxs, getset);

    if (!useItAny) {
        return [{
            error: isLogin ? 'No login fields selected' : 'No password change fields selected',
            tab,
        }];
    }

    if (!useItPsw) {
        return [{
            error: 'No password fields selected',
            tab,
        }];
    }

    tab = 'cpass';

    if (!isLogin) {
        if (!linkedCur || !linkedNew) {
            return [{
                error: 'There are no linkes from the password change form to the login form',
                tab,
            }];
        }
    }

}

function totalFieldsInUse(rowCtxs: FieldRowCtx[] | undefined, { get }: GetSet) {
    let rv = {
        useItAny: 0,
        useItPsw: 0,
        pswCur: 0,
        pswNew: 0,
        linkedCur: 0,
        linkedNew: 0,
    };

    rowCtxs?.forEach(
        (fieldRowCtx) => {
            const useIt = get(fieldRowCtx.useItAtom);
            const fieldTyp: FieldTyp = get(fieldRowCtx.typeAtom);
            const isPsw = fieldTyp === FieldTyp.psw;
            const rfield = get(fieldRowCtx.rfieldAtom);
            const rfiledUuid = get(fieldRowCtx.rfieldUuidAtom);

            if (useIt) {
                rv.useItAny++;

                if (isPsw) {
                    rv.useItPsw++;

                    const isCurrent = rfield === 'in';
                    const isNew = rfield === 'out';

                    if (isCurrent || isNew) {
                        const isLinked = !!rfiledUuid;
                        if (isLinked) {
                            if (isCurrent) {
                                rv.pswCur++;
                                rv.linkedCur++;
                            } else if (isNew) {
                                rv.pswNew++;
                                rv.linkedNew++;
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
