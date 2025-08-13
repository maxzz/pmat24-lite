// test in use

export type TestInUseFile = {               // Test in use (Tiu) file
    fullfname: string;                      // Full path to the file and filename
    unid: number;                           // Unique ID of the file (per session)
    inTest: boolean;                        // What to do with the file: put in 'c' or remove it from 'c'
    rawCnt: string | undefined;             // Raw content of the file if inTest is true
};

export type TestInUseResultItem = {         // Test in use (Tiu) result
    unid: number;                           // Unique ID of the file (per session)
    error: string | undefined;              // Error message if any
};
