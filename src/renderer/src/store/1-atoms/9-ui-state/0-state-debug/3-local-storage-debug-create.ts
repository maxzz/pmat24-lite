export const testScreen = { // Test screenshots collection
    A: 'A',
    B: 'B',
    none: 'none',
};

export const testApp = { // New manifest test content
    win32: 'win32',
    web: 'web',
    none: 'none',
};

export type TestScreenEnum = keyof typeof testScreen;   // Test screenshots collection
export type TestAppEnum = keyof typeof testApp;         // New manifest test content

//

export type TestCreate = {
    screen: TestScreenEnum;
    app: TestAppEnum;
};

export const initialTestCreate: TestCreate = {
    screen: 'none',
    app: 'none',
};
