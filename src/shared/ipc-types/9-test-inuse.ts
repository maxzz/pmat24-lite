// test in use

export type TestInUseFile = {               // Test in use (Tiu) file
    fullfname: string;                      // Full path to the file and filename
    unid: number;                           // Unique ID of the file (per session)
    rawCnt: string | undefined;             // Raw content of the file if inTest is true
    inTest: boolean;                        // What to do with the file: put in 'c' or remove it from 'c'
};

//

export type TestInUseParams_Start = {       // Test in use (Tiu) params for operation at the app start; inTest is true
    shortfname: string;                     // Shrot filename wo/ path (files will be saved in cache 'c' folder)
    unid: number;                           // Unique ID of the file (per session) to report error
    rawCnt: string | undefined;             // Raw content of the file if inTest is true
};

export type TestInUseParams_Set = {        // Test in use (Tiu) params for operation set inTest
    shortfname: string;                     // Shrot filename wo/ path (files will be saved in cache 'c' folder)
    unid: number;                           // Unique ID of the file (per session) to report error
    rawCnt: string | undefined;             // Raw content of the file if inTest is true
    inTest: boolean;                        // What to do with the file: put in 'c' or remove it from 'c'
};

export type TestInUseResultItem = {         // Test in use (Tiu) result
    unid: number;                           // Unique ID of the file (per session)
    error: string | undefined;              // Error message if any
};
