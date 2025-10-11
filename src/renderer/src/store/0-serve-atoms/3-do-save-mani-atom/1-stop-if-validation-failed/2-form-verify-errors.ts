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

    const { useItAny, useItPsw, linkedCur, linkedNew } = totalFieldsInUse(formCtx.normal.rowCtxs, getset);

    const isLogin = formIdx === FormIdx.login;
    let error: string | undefined;

    // 1. Checks for login and cpass forms

    let tab: ManiTabValue = isLogin ? 'login' : 'cpass';

    if (!useItAny) {
        error = 'There are no fields selected';
    }

    if (!useItPsw) {
        error = 'There are no password fields selected';
    }

    // 2. Checks for cpass form only

    if (!error && !isLogin) {
        tab = 'cpass';

        if (linkedCur > 1) {
            error = 'Only one field can be linked to the password entry in the login form.';
        }
        else if (!linkedCur) {
            error = 'The password change form does not contain a link to the password entry in the login form. To create a link, you must select a field, link it to the password field on the login form, and specify it as the current confirm password.';
        }
        else if (!linkedNew) {
            error = 'The password change form does not contain links to the login form indicating where to save the new password. To create a link, you must select a field, link it to the password field on the login form, and specify it as the new password or confirm password.';
        }
    }

    if (error) {
        return [{ error, tab, }];
    }
}

function totalFieldsInUse(rowCtxs: FieldRowCtx[] | undefined, { get }: GetSet) {
    let rv = {
        useItAny: 0,
        useItPsw: 0,
        linkedCur: 0,
        linkedNew: 0,
    };

    rowCtxs?.forEach(
        (fieldRowCtx) => {
            const useIt = get(fieldRowCtx.useItAtom);
            if (useIt) {
                rv.useItAny++;

                const isPsw = get(fieldRowCtx.typeAtom) === FieldTyp.psw;
                if (isPsw) {
                    rv.useItPsw++;

                    const rfield = get(fieldRowCtx.rfieldAtom);
                    if (rfield) {
                        const isCurrent = rfield === 'in';
                        const isNew = rfield === 'out';

                        if (isCurrent || isNew) {

                            const isLinked = !!get(fieldRowCtx.rfieldUuidAtom);
                            if (isLinked) {
                                if (isCurrent) {
                                    rv.linkedCur++;
                                } else if (isNew) {
                                    rv.linkedNew++;
                                }
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
