import { FormIdx, FieldTyp } from "@/store/manifest";
import { type VerifyError, type ManiTabValue, type FieldRowCtx } from "@/store/2-file-mani-atoms";

type TotalCount = {
    useItAny: number;
    useItPsw: number;
    linkedCur: number;
    linkedNew: number;
};

export function totalFieldsInUse(rowCtxs: FieldRowCtx[] | undefined, { get }: GetSet): TotalCount {
    const rv: TotalCount = {
        useItAny: 0,
        useItPsw: 0,
        linkedCur: 0,
        linkedNew: 0,
    };

    rowCtxs?.forEach((fieldRowCtx) => processFieldRowCtx(fieldRowCtx, rv, get));

    return rv;
}

function processFieldRowCtx(fieldRowCtx: FieldRowCtx, rv: TotalCount, get: Getter): void {
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

export function getTotalCountErrorMessage({ useItAny, useItPsw, linkedCur, linkedNew }: TotalCount, formIdx: FormIdx): VerifyError[] | undefined {
    let error: string | undefined;

    const isLogin = formIdx === FormIdx.login;

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
