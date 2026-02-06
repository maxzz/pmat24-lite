import { FormIdx, FieldTyp } from "@/store/8-manifest";
import { type VerifyError, type ManiTabValue, type FieldRowCtx } from "@/store/2-file-mani-atoms";

export function getTotalCountError(fieldRowCtxs: FieldRowCtx[], formIdx: FormIdx, get: Getter): VerifyError[] | undefined {
    const totalCount = totalFieldsInUse(fieldRowCtxs, get);
    const rv = getTotalCountErrorMessage(totalCount, formIdx);
    return rv;
}

type TotalCount = {
    nUseItAny: number;           // number of fields in use
    nUseItPsw: number;           // number of password fields in use
    nLinkedCurPsw: number;       // number of linked fields to the current password field
    nLinkedNewPsw: number;       // number of linked fields to the new password field
};

// 1. Counts the total number of fields in use and the number of linked fields

function totalFieldsInUse(rowCtxs: FieldRowCtx[] | undefined, get: Getter): TotalCount {
    const rv: TotalCount = {
        nUseItAny: 0,
        nUseItPsw: 0,
        nLinkedCurPsw: 0,
        nLinkedNewPsw: 0,
    };

    rowCtxs?.forEach(
        (fieldRowCtx) => processFieldRowCtx(fieldRowCtx, rv, get)
    );

    return rv;
}

function processFieldRowCtx(fieldRowCtx: FieldRowCtx, rv: TotalCount, get: Getter): void {
    const useIt = get(fieldRowCtx.useItAtom);
    if (!useIt) {
        return;
    }
    rv.nUseItAny++;

    const isPsw = get(fieldRowCtx.typeAtom) === FieldTyp.psw;
    if (!isPsw) {
        return;
    }
    rv.nUseItPsw++;

    const rfield = get(fieldRowCtx.rfieldAtom);
    if (!rfield) {
        return;
    }

    const isDirCurPsw = rfield === 'in';
    const isDirNewPsw = rfield === 'out';

    if (isDirCurPsw || isDirNewPsw) {
        const isLinked = !!get(fieldRowCtx.rfieldUuidAtom);
        if (isLinked) {
            if (isDirCurPsw) {
                rv.nLinkedCurPsw++;
            }
            else if (isDirNewPsw) {
                rv.nLinkedNewPsw++;
            }
        }
    }
}

// 2. Returns the error message if the total number of fields in use and the number of linked fields is not valid

function getTotalCountErrorMessage(totalCount: TotalCount, formIdx: FormIdx): VerifyError[] | undefined { // Only first error is returned since we use toast to show it
    const { nUseItAny, nUseItPsw, nLinkedCurPsw, nLinkedNewPsw } = totalCount;

    const rv: VerifyError[] = [];
    let error: string | undefined;

    const isLogin = formIdx === FormIdx.login;

    // 1. Checks for login and cpass forms

    let tab: ManiTabValue = isLogin ? 'login' : 'cpass';

    if (!nUseItAny) {
        error = 'There are no fields selected';
    }

    if (!nUseItPsw) {
        error = 'There are no password fields selected';
    }

    // 2. Checks for cpass form only

    if (!error && !isLogin) {
        tab = 'cpass';

        if (nLinkedCurPsw > 1) {
            error = 'Only one field can be linked to the password entry in the login form.';
        }
        else if (!nLinkedCurPsw) {
            error = 'The password change form does not contain a link to the password entry in the login form. To create a link, you must select a field, link it to the password field on the login form, and specify it as the current confirm password.';
        }
        else if (!nLinkedNewPsw) {
            error = 'The password change form does not contain links to the login form indicating where to save the new password. To create a link, you must select a field, link it to the password field on the login form, and specify it as the new password or confirm password.';
        }
    }

    if (error) {
        return [{ error, tab, }];
    }
}
