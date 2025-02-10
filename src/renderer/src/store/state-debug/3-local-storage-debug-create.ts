export const testScreen2 = { // Test screenshots collection
    A: 'A',
    B: 'B',
    none: 'none',
};

export const testApp2 = { // New manifest test content
    win32: 'win32',
    web: 'web',
    none: 'none',
};

export type TestScreenEnum = keyof typeof testScreen2; // Test screenshots collection
export type TestAppEnum = keyof typeof testApp2; // New manifest test content

export type TestCreateOptions = {
    screen: TestScreenEnum;
    app: TestAppEnum;
};

export const initialTestCreateOptions: TestCreateOptions = {
    screen: 'none',
    app: 'none',
};

// const testCreateOptions = proxy<TestCreateOptions>({
//     screen: 'none',
//     app: 'none',
// });
