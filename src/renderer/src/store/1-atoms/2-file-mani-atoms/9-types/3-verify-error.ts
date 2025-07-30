export type ManiTabValue = 'options' | 'login' | 'cpass';

export type VerifyError = {
    error: string;                          // error message
    tab: ManiTabValue;                      // tab where error is
    actionUuid?: string | number;           // script action uuid where error is
};
