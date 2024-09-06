export type VerifyError = {
    error: string;                          // error message
    tab: 'options' | 'login' | 'cpass';     // tab where error is
    actionUuid?: string | number;           // script action uuid where error is
};
