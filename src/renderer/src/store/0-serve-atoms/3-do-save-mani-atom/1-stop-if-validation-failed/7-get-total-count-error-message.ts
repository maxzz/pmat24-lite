import { FormIdx } from "@/store/manifest";
import type { VerifyError, ManiTabValue } from "@/store/2-file-mani-atoms";

export type TotalCount = {
    useItAny: number;
    useItPsw: number;
    linkedCur: number;
    linkedNew: number;
};

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
