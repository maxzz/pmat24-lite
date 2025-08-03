export type ManiTabValue = 'options' | 'login' | 'cpass';

export type VerifyError = {
    error: string;                          // error message
    tab: ManiTabValue;                      // tab where error is
    
    //TODO: right now the following not really needed; just for future (we need to set them properly and then navigate to them):
    
    actionUuid?: string | number;           // script action uuid where error is
    rowIdx?: number;                        // row index inside the list of fields (mostly for manual mode forms)
    atomName?: string;                      // name of verification failed atom (manual mode has atoms for selected row and for options)
    groupName?: string;                     // name of group to expand (for options)
};
