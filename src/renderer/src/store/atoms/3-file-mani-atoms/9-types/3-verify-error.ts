export type VerifyError = {
    msg: string;                            // error message
    tab: 'options' | 'login' | 'cpass';     // tab where error is
    actionUuid?: string;                    // script action uuid where error is
};
